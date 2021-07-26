import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import connectDB from "src/middleware/typeOrmDb";
import {
  villainFindByIdAndRemove,
  villainFindByIdAndUpdate,
} from "src/services/api/villainService";

const handler = nc()
  .use(connectDB)
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      await villainFindByIdAndRemove(id);
      res.statusCode = 204;
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      await villainFindByIdAndUpdate(id, req.body);
      res.statusCode = 200;
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default handler;
