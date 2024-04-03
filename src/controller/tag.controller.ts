import { Request, Response } from "express";
import { fetchAllTags } from "../service/tag.service";

const getTags = async (req: Request, res: Response) => {
  const result = await fetchAllTags();

  res.status(result.code).send(result);
};

export { getTags };
