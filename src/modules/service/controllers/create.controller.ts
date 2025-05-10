import { FastifyRequest, FastifyReply } from "fastify";
import { createServiceSchema } from "../schema/service";
import { CreateServiceService } from "../services";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { env } from "../../../validators/env.schema";

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

class CreateServiceController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const parts = req.parts();

    let name = "";
    let description = "";
    let category_id = "";
    let fileBuffer: Buffer | null = null;

    for await (const part of parts) {
      if (part.type === "file" && part.fieldname === "file") {
        fileBuffer = await part.toBuffer();
      } else if (part.type === "field") {
        if (part.fieldname === "name") name = part.value as string;
        if (part.fieldname === "description")
          description = part.value as string;
        if (part.fieldname === "category_id")
          category_id = part.value as string;
      }
    }

    if (!fileBuffer) {
      return reply.status(400).send({ message: "Arquivo é obrigatório" });
    }

    const parsed = createServiceSchema.parse({
      name,
      description,
      category_id,
    });

    const resultFile: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {},
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error("Upload falhou."));
            resolve(result);
          }
        );

        uploadStream.end(fileBuffer);
      }
    );

    const createService = new CreateServiceService();

    const service = await createService.execute({
      name: parsed.name,
      description: parsed.description,
      image: resultFile.secure_url,
      category_id: parsed.category_id,
    });

    return reply.status(201).send(service);
  }
}

export { CreateServiceController };
