import { ServiceResponse } from '../Interfaces/serviceResponse';
import MatchModel from '../database/models/Macthes.Model';
import { MatchModelInterface } from '../Interfaces/matches.interface.model';
import { MatchesInterface } from '../Interfaces/macthes.interface';

export default class MatchService {
  constructor(
    private model: MatchModelInterface = new MatchModel(),
  ) {}

  public async allMatches(inProgress?: boolean): Promise<ServiceResponse<MatchesInterface[]>> {
    const macthes = await this.model.allMatches(inProgress);
    return {
      status: 'SUCCESSFUL',
      data: macthes,
    };
  }

  public async finishedMatches(id: string, match: MatchesInterface) {
    await this.model.finishedMatches(id, match);
    return {
      status: 'SUCCESSFUL',
      message: 'Match finished',
    };
  }

  public async updatedMatches(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: string,
  ) {
    await this.model.updatedMatches(
      homeTeamGoals,
      awayTeamGoals,
      id,
    );
    return {
      status: 'SUCCESSFUL',
      data: 'Match updated',
    };
  }
}
