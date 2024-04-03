import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authRouter, bookRouter, orderRouter } from "./routes";
import { isAuthenticated } from "./middleware/auth.middleware";

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

const apiUrl = "/api/v1";

app.use(express.json());

app.use(`${apiUrl}/auth`, authRouter);
app.use(`${apiUrl}/book`, bookRouter);
app.use(`${apiUrl}/order`, isAuthenticated, orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
