import { getRepository } from "typeorm";

import { VillainEntity } from "src/models/api/villainEntity";

export const villainFind = async (): Promise<VillainEntity[]> => {
  try {
    let db = getRepository(VillainEntity);
    return await db.find();
  } catch (e) {
    throw e;
  }
};

export const villainFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    let db = getRepository(VillainEntity);
    await db.delete({ id });
  } catch (e) {
    throw e;
  }
};

export const villainSave = async (
  body: VillainEntity
): Promise<VillainEntity> => {
  try {
    let db = getRepository(VillainEntity);
    return await db.save(body);
  } catch (e) {
    throw e;
  }
};

export const villainFindByIdAndUpdate = async (
  id: string,
  body: VillainEntity
): Promise<void> => {
  try {
    let db = getRepository(VillainEntity);
    const villainToUpdate: VillainEntity = await db.findOne({
      id,
    });
    let updated: VillainEntity = Object.assign(villainToUpdate, body);
    // based on TypeORM's docs use db.save instead of db.update
    await db.save(updated);
  } catch (e) {
    throw e;
  }
};

export const villainFindById = async (id: string): Promise<VillainEntity> => {
  try {
    let db = getRepository(VillainEntity);
    return await db.findOne({ id });
  } catch (e) {
    throw e;
  }
};
