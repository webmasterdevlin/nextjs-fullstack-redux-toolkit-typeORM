import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import connectDB from "src/middleware/typeOrmDb";
import {
  antiHeroFindByIdAndRemove,
  antiHeroFindByIdAndUpdate,
} from "src/services/api/antiHeroService";

const handler = nc()
  .use(connectDB)
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      await antiHeroFindByIdAndRemove(id);
      res.statusCode = 204;
      res.send("DELETED");
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      await antiHeroFindByIdAndUpdate(id, req.body);
      res.statusCode = 200;
      res.send("UPDATED");
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default handler;
