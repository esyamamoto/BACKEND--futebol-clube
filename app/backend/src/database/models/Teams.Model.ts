import { TeamModelInterface } from '../../Interfaces/team.interface.model';
import SequelizeTeams from './Sequelize.Teams.model';

export default class TeamModel implements TeamModelInterface {
  private model = SequelizeTeams;

  async findAll(): Promise<SequelizeTeams[]> {
    const dbTeams = await this.model.findAll();
    return dbTeams;
  }
}
