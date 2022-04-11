// src/controller/worldCupController.ts
import { Request, Response } from 'express';
import WorldCupService from '../services/worldCupService';

class WorldCupController {
  constructor(private worldCupService = new WorldCupService()) {}

  serverError = 'Internal Server Error';

  public getWorldCups = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const worldCups = await this.worldCupService.getWorldCups();
      return res.status(200).send(worldCups);
    } catch (error) {
      return res.status(500).send(this.serverError);
    }
  };

  public getWorldCupByYear = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { year } = req.params;
    try {
      const worldCup = await this
        .worldCupService.getWorldCupByYear(Number(year));
      if (worldCup?.length === 0) {
        return res.status(404)
          .send({ error: 'Not found any world cup with this year' });
      }
      return res.status(200).send(worldCup);
    } catch (error) {
      return res.status(500).send(this.serverError);
    }
  };

  public insertWorldCup = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { body: worldCupData } = req;
    try {
      const worldCup = await this.worldCupService.insertWorldCup(worldCupData);
      return res.status(201).send(worldCup);
    } catch ({ _message }) {
      if (_message === 'Tournaments validation failed') {
        return res.status(400).send(_message);
      }
      return res.status(500).send(this.serverError);
    }
  };

  public updateWorldCup = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { body: updateData, params: { year } } = req;
    try {
      const updatedWorldCup = await this
        .worldCupService.updateWorldCup(updateData, Number(year));
      return res.status(200).send(updatedWorldCup);
    } catch (error) {
      console.log(error);
      return res.status(500).send(this.serverError);
    }
  };

  public deleteWorldCup = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { year } = req.params;
    try {
      const deletedWorldCup = await this
        .worldCupService.deleteWorldCup(Number(year));
      return res.status(200).send(deletedWorldCup);
    } catch (error) {
      console.log(error);
      return res.status(500).send(this.serverError);
    }
  };

  public runnerUp = async (req: Request, res: Response):
  Promise<Response> => {
    try {
      const { runnerUp } = req.query;
      if (typeof runnerUp !== 'string') {
        return res.status(400).send({ message: 'Bad request' });
      }
      const country = await this.worldCupService.runnerUp(runnerUp);
      return res.status(200).send(country);
    } catch (err: unknown) {
      return res.status(500).send({ message: this.serverError });
    }
  };
}

export default WorldCupController;