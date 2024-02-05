import { MatchesInterface } from '../../Interfaces/macthes.interface';
import { MatchModelInterface } from '../../Interfaces/matches.interface.model';
import SequelizeMatches from './Sequelize.Matches.Model';

export default class MatchModel implements MatchModelInterface {
  private model = SequelizeMatches;

  async allMatches(inProgress?:boolean): Promise<MatchesInterface[]> {
    const matches = await this.model.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (inProgress !== undefined) {
      return matches.filter((match) => match.inProgress === inProgress);
    }
    return matches;
  }

  async finishedMatches(id: string): Promise<MatchesInterface> {
    const match = await this.model.findByPk(id);
    if (!match) {
      throw new Error('Match not found');
    }
    await match.update({ id: match.id, inProgress: false });
    return match;
  }

  async updatedMatches(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: string,
  ): Promise<MatchesInterface> {
    const matchUpdate = await this.model.findByPk(id);
    if (!matchUpdate) {
      throw new Error('Match not found');
    }
    await matchUpdate.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return matchUpdate;
  }
}
