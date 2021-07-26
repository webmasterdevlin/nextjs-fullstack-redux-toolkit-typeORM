import boom from "@hapi/boom";
import { getRepository } from "typeorm";

import { AntiHeroEntity } from "src/models/api/antiHeroEntity";

export const antiHeroFind = async (): Promise<AntiHeroEntity[]> => {
  try {
    let db = getRepository(AntiHeroEntity);
    return await db.find();
  } catch (e) {
    throw boom.boomify(e);
  }
};

export const antiHeroFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    let db = getRepository(AntiHeroEntity);
    await db.delete({ id });
  } catch (e) {
    throw boom.boomify(e);
  }
};

export const antiHeroSave = async (
  body: AntiHeroEntity
): Promise<AntiHeroEntity> => {
  try {
    let db = getRepository(AntiHeroEntity);
    return await db.save(body);
  } catch (e) {
    console.log(e);
    throw boom.boomify(e);
  }
};

export const antiHeroFindByIdAndUpdate = async (
  id: string,
  body: AntiHeroEntity
): Promise<void> => {
  try {
    let db = getRepository(AntiHeroEntity);
    const antiHeroToUpdate: AntiHeroEntity = await db.findOne({
      id,
    });
    let updated: AntiHeroEntity = Object.assign(antiHeroToUpdate, body);
    // based on TypeORM's docs use db.save instead of db.update
    await db.save(updated);
  } catch (e) {
    boom.boomify(e);
  }
};

export const antiHeroFindById = async (id: string): Promise<AntiHeroEntity> => {
  try {
    let db = getRepository(AntiHeroEntity);
    return await db.findOne({ id });
  } catch (e) {
    boom.boomify(e);
  }
};
