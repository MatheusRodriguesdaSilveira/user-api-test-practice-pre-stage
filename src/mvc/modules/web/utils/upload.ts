import { MultipartFile } from "@fastify/multipart";
import { cloudinary } from "../../../../config/cloudinary";

class UploadImageService {
  /**
   * Faz o upload do stream de arquivo para o Cloudinary.
   * @param file A parte do arquivo (stream) do formulário multipart.
   * @returns A URL segura do arquivo no Cloudinary.
   */
  async execute(file: MultipartFile): Promise<string> {
    return new Promise((resolve, reject) => {
      // Cria um stream de upload para o Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "servicos" }, // Pasta onde o arquivo será salvo no Cloudinary
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(new Error("Falha no upload para o Cloudinary."));
          }
          if (result && result.secure_url) {
            resolve(result.secure_url); // Resolve com a URL do arquivo
          } else {
            reject(new Error("URL do Cloudinary não retornada."));
          }
        }
      );

      // Pipe (Conecta) o stream do arquivo do Fastify ao stream do Cloudinary
      file.file.pipe(uploadStream);
    });
  }
}

export { UploadImageService };
