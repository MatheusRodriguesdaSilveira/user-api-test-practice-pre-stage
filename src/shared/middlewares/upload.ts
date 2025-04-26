import multer from "fastify-multer";
import { resolve } from "path";
import crypto from "crypto";
import removeAccents from "remove-accents";

export const upload = {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");

          // Limpa o nome do arquivo: remove acentos e caracteres especiais
          const cleanName = removeAccents(file.originalname).replace(
            /[^a-zA-Z0-9.-]/g,
            "-"
          ); // Substitui caracteres especiais por hífen

          const fileName = `${fileHash}-${cleanName}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
