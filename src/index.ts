import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter, bookRouter, orderRouter, tagRouter } from "./routes";
import { isAuthenticated } from "./middleware/auth.middleware";

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

const apiUrl = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(`${apiUrl}/auth`, authRouter);
app.use(`${apiUrl}/tag`, tagRouter);
app.use(`${apiUrl}/book`, bookRouter);
app.use(`${apiUrl}/order`, isAuthenticated, orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
