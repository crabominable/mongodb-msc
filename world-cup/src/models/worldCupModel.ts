// src/model/worldCupModel.ts
import { model as createModel } from 'mongoose';
import { WorldCupSchema, IWorldCup } from '../schemas/worldCup';

class WorldCupModel {
  constructor(private worldCupModel = createModel<IWorldCup>(
    'tournaments',
    WorldCupSchema,
  )) {}

  public async getWorldCups(): Promise<IWorldCup[] | undefined> {
    const worldCups = await this.worldCupModel.find();
    return worldCups;
  }

  public async getWorldCupByYear(
    year: number,
  ): Promise<IWorldCup[] | undefined> {
    const worldCup = await this.worldCupModel.find({ year });
    return worldCup;
  }

  public async insertWorldCup(
    worldCupData: IWorldCup,
  ): Promise<IWorldCup | unknown> {
    const worldCup = await this.worldCupModel.create(worldCupData);
    return worldCup;
  }

  public async updateWorldCup(
    updateData: object,
    worldCupYear: number,
  ): Promise<object | undefined> {
    const updatedWorldCup = await this
      .worldCupModel.updateOne({ year: worldCupYear }, { ...updateData });
    return updatedWorldCup;
  }

  public async deleteWorldCup(year: number): Promise<object | undefined> {
    const deletedWorldCup = await this.worldCupModel.deleteOne({ year });
    return deletedWorldCup;
  }
  
  public async runnerUp(term: string): Promise<IWorldCup[] | null> {
    const data = await this.worldCupModel.find(
      { runnerUp: { $regex: term, $options: 'i' } },
    );
    return data;
  }
}

export default WorldCupModel;