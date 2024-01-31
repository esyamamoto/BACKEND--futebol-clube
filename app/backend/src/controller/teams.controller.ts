import { Request, Response } from 'express';
import TeamService from '../service/teams.service';
import statusHTTPMap from '../utils/mapStatusHttp';

export default class TeamsController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  async findAll(_req: Request, res: Response) {
    const teams = await this.teamService.findAllTeams();
    return res.status(statusHTTPMap(teams.status)).json(teams.data);
  }
}
