import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import TeamModel from '../database/models/Teams.Model';
import mockTeams from './mocks/teams.Mocks';
import oneTeam from './mocks/teams.Mocks';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;


describe('TeamService', () => {
    it('Verifica se retorna todas as equipes', async () => { 
      sinon.stub(TeamModel.prototype, 'findAll').resolves(mockTeams as any);

      const {status, body} = await chai.request(app).get('/teams');

      expect(status).to.equal('SUCCESS');
      expect(body).to.deep.equal(mockTeams);
      });

    it('Verifica se retorna uma equipe pelo ID', async () => {
      sinon.stub(mockTeams, 'mockTeams').resolves(oneTeam as any);

    const {status, body} = await chai.request(app).get('/teams/1');

    expect(status).to.equal('SUCCESS');
    expect(body).to.be.deep.eq(oneTeam);

      });
    it('Verifica se retorna NOT_FOUND se a equipe não for encontrada', async function() {
      sinon.stub(mockTeams, 'mockTeams').resolves(null);

      const {status, body} = await chai.request(app).get('/teams/654');
  
      expect(status).to.equal('NOT_FOUND');
      expect(body).to.be.deep.eq( { message: 'Team not found'} );

      });
    });
