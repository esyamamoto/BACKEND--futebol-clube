import MatchModel from '../database/models/Macthes.Model';
import TeamModel from '../database/models/Teams.Model';
import { totalGames,
  totalWinsHome,
  totalWinsAway,
  totalLosses,
  totalDraws,
  goalsOwn,
  goals,
  totalPoints,
} from '../database/models/scoreboard.model';

export default class scoreBoardService {
  constructor(
    private model = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async allScoreBoard() {
    const teams = await this.teamModel.findAll();
    const matches = await this.model.allMatches(undefined);
    const teamsScore = teams.map((team) => ({
      name: team.teamName,
      totalGames: totalGames(team.id, matches),
      totalVictories: totalWinsHome(team.id, matches) + totalWinsAway(team.id, matches),
      totalLosses: totalLosses(team.id, matches),
      totalDraws: totalDraws(team.id, matches),
      goalsFavor: goals(team.id, matches),
      goalsOwn: goalsOwn(team.id, matches),
      totalPoints: totalPoints(team.id, matches),
    }));
    return { status: 'SUCCESSFUL', data: teamsScore };
  }
}
