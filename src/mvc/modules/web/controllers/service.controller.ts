import { FastifyReply, FastifyRequest } from "fastify";
import { GetCategoriesService } from "../../category";
import {
  CreateServiceService,
  DeleteServiceService,
  GetServicesService,
} from "../../service";
import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../../../../config/cloudinary";
import { UpdateServiceService } from "../../service/services/update.service";
import { GetServiceByIdService } from "../../service/services/get-by-id.service";

const getCategoriesService = new GetCategoriesService();
const getServicesService = new GetServicesService();
const createServiceService = new CreateServiceService();
const updateServiceService = new UpdateServiceService();
const getServiceByIdService = new GetServiceByIdService();
const deleteServiceService = new DeleteServiceService();

export async function showServiceList(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const services = await getServicesService.execute();

    return reply.view("service/list_admin.ejs", {
      title: "Gerenciar Serviços",
      services: services,
    });
  } catch (error) {
    console.error("Erro ao carregar lista de serviços:", error);
    return reply.status(500).send({
      message: "Erro interno ao carregar dados de serviços.",
    });
  }
}

export async function showServiceForm(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const categories = await getCategoriesService.execute();

    return reply.view("service/form_admin.ejs", {
      title: "Criar Novo Serviço",
      categories: categories,
      error: undefined,
      formData: {},
    });
  } catch (error) {
    console.error("Erro ao carregar categorias para o formulário:", error);
    return reply.status(500).send({
      message: "Erro interno ao carregar dados de categorias.",
      error: "Não foi possível carregar as categorias.",
    });
  }
}

export async function createService(req: FastifyRequest, reply: FastifyReply) {
  let price = 0;
  let name = "";
  let description = "";
  let category_id = "";
  let fileBuffer: Buffer | null = null;

  const formData: Record<string, string> = {}; // Guarda valores do formulário

  try {
    // 1. Coletar dados do Multipart/Form-data
    const parts = req.parts();
    for await (const part of parts) {
      if (part.type === "file" && part.fieldname === "image") {
        fileBuffer = await part.toBuffer();
      } else if (part.type === "field") {
        formData[part.fieldname] = part.value as string;
        if (part.fieldname === "name") name = part.value as string;
        if (part.fieldname === "description")
          description = part.value as string;
        if (part.fieldname === "category_id")
          category_id = part.value as string;
        if (part.fieldname === "price")
          price = parseFloat(part.value as string);
      }
    }

    // 2. Validação básica
    if (!fileBuffer) {
      throw new Error("A imagem do serviço é obrigatória.");
    }

    // 3. Upload da imagem para o Cloudinary
    const resultFile: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "servicos" },
          (error, result) => {
            if (error) {
              console.error("Erro no Cloudinary:", error);
              return reject(error);
            }
            if (!result) return reject(new Error("Upload falhou."));
            resolve(result);
          }
        );
        uploadStream.end(fileBuffer);
      }
    );

    const imageUrl = resultFile.secure_url;

    // 4. Criação do Serviço no BD
    await createServiceService.execute({
      name,
      description,
      category_id,
      price,
      image: imageUrl,
    });

    // 5. Sucesso: Redireciona para a lista
    return reply.redirect("/admin/service/list");
  } catch (error) {
    const categories = await getCategoriesService.execute();

    let errorMessage = "Falha ao criar serviço. Tente novamente.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // 6. Retorna para o formulário com os dados já digitados
    return reply.view("service/form_admin.ejs", {
      title: "Criar Novo Serviço",
      categories,
      error: errorMessage,
      formData: {},
    });
  }
}

export async function deleteService(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  try {
    await deleteServiceService.execute(id); // Redireciona para a lista após a exclusão bem-sucedida

    return reply.redirect("/admin/service/list");
  } catch (error) {
    // Se houver erro, loga e redireciona de volta com uma mensagem
    console.error("Erro ao deletar serviço:", error);

    return reply.status(500).send({
      message: "Erro ao deletar o serviço. Verifique o log do servidor.",
    });
  }
}

export async function showServiceEditForm(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const getServiceByIdService = new GetServiceByIdService();

    // 1. Buscar o serviço existente pelo ID
    const service = await getServiceByIdService.execute(id);

    // 2. Buscar todas as categorias para o <select>
    const categories = await getCategoriesService.execute();

    // 3. Renderizar a view específica de edição
    return reply.view("service/edit.ejs", {
      title: `Editar Serviço: ${service.name}`,
      service,
      categories,
      error: undefined,
    });
  } catch (error) {
    console.error("Erro ao carregar serviço para edição:", error);
    let errorMessage = "Serviço não encontrado ou erro ao carregar dados.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return reply.redirect(
      `/admin/service/list?error=${encodeURIComponent(errorMessage)}`
    );
  }
}

export async function editService(req: FastifyRequest, reply: FastifyReply) {
  const { id: service_id } = req.params as { id: string };

  let name = "";
  let description = "";
  let category_id = "";
  let price = 0;
  let fileBuffer: Buffer | null = null;
  let oldImageUrl: string | undefined = undefined;

  const formData: any = {};

  try {
    // 1. Coletar dados do Multipart/Form-data
    const parts = req.parts();
    for await (const part of parts) {
      if (part.type === "file" && part.fieldname === "image") {
        fileBuffer = await part.toBuffer();
      } else if (part.type === "field") {
        formData[part.fieldname] = part.value as string;

        // Atribuição das variáveis principais
        if (part.fieldname === "name") name = part.value as string;
        if (part.fieldname === "description")
          description = part.value as string;
        if (part.fieldname === "category_id")
          category_id = part.value as string;
        if (part.fieldname === "old_image_url")
          oldImageUrl = part.value as string;

        if (part.fieldname === "price") {
          let priceValue = (part.value as string).trim();

          priceValue = priceValue.replace(",", ".");

          if (priceValue === "") {
            throw new Error("O preço do serviço é obrigatório.");
          }
          price = parseFloat(priceValue);
        }
      }
    }

    if (isNaN(price) || price < 0) {
      throw new Error(
        "Preço inválido. Deve ser um número maior ou igual a zero."
      );
    }
    if (category_id.trim() === "") {
      throw new Error("A categoria é obrigatória.");
    }

    let imageUrl = oldImageUrl;

    if (fileBuffer && fileBuffer.length > 0) {
      const resultFile: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "servicos" },
            (error, result) => {
              if (error) return reject(error);
              if (!result) return reject(new Error("Upload falhou."));
              resolve(result);
            }
          );
          uploadStream.end(fileBuffer);
        }
      );
      imageUrl = resultFile.secure_url;
    }

    await updateServiceService.execute({
      service_id,
      name,
      description,
      price,
      category_id,
      image: imageUrl,
    });

    return reply.redirect("/admin/service/list");
  } catch (error) {
    console.error("ERRO DURANTE A ATUALIZAÇÃO DO SERVIÇO:", error);
    const categories = await getCategoriesService.execute();
    const service = await getServiceByIdService.execute(service_id);

    let errorMessage = "Falha ao atualizar serviço. Tente novamente.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return reply.view("service/edit.ejs", {
      title: `Editar Serviço: ${service.name}`,
      categories,
      service,
      isEdit: true,
      error: errorMessage,
      formData: {
        name: formData.name || name,
        description: formData.description || description,
        category_id: formData.category_id || category_id,
        price: formData.price || price,
        image: oldImageUrl,
      },
    });
  }
}
