import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", router);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 3333, () =>
    console.log(
      `Server: http://localhost:${process.env.PORT || 3333} is running ⚡⚡⚡`
    )
  );
}

export default app;
