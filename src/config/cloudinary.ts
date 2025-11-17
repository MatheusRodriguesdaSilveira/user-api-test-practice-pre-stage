import { v2 as cloudinary } from "cloudinary";
import { env } from "../validators/env.schema"; // ajuste o caminho conforme o seu projeto

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

export { cloudinary };
