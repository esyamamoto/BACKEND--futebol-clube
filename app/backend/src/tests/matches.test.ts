import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as matchesMock from '../tests/mocks/match.mocks'
import { App } from '../app';

// @ts-ignore
import chaiHttp = require('chai-http');
import MatchService from '../service/matches.service';
import MatchModel from '../database/models/Macthes.Model';
import TeamService from '../service/teams.service';
import MatchController from '../controller/matches.controller';
import { MatchesInterface } from '../Interfaces/macthes.interface';
import { MatchModelInterface } from '../Interfaces/matches.interface.model';
import ValidateMatch from '../middlewares/validateMatch';


chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Matches', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Verifica se retorna um error, caso não envie um token', async function () {
    const { status, body } = await chai.request(app).post("/matches")
    .send(matchesMock.NewMatches)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token not found' })
  })

  it('Verifica se retorna um error, caso seja um token inválido', async function () {

    sinon.stub(jwt, 'verify').throws(new Error('Token must be a valid token'))
    const { status, body } = await chai.request(app).post("/matches")
    .set({'Authorization': `Bearer any-token`})
    .send(matchesMock.NewMatches)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' })
  });

  it('Verifica se retorna um error, caso seja enviado um token inválido', async function () {

    sinon.stub(jwt, 'verify').throws(new Error('Token must be a valid token'))
    const { status, body } = await chai.request(app).post("/matches")
    .set({'Authorization': `Bea any-token`})
    .send(matchesMock.NewMatches)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' })
  });

  afterEach(sinon.restore);
})

describe('MatchService', function () {
    let matchService: MatchService;
  
    beforeEach(function () {
      matchService = new MatchService(new MatchModel(), new TeamService());
    });
  
    afterEach(function () {
      sinon.restore();
    });
  
    it('Deve retornar todos os jogos em andamento', async function () {
        sinon.stub(MatchModel.prototype, 'allMatches').resolves(matchesMock.matchesOk);
        const result = await matchService.allMatches(true);
        expect(result.status).to.equal('SUCCESSFUL');
        expect(result.data).to.deep.equal(matchesMock.matchesOk);
    });
  
    it('Deve retornar todos os jogos finalizados', async function () {
      sinon.stub(MatchModel.prototype, 'allMatches').resolves(matchesMock.finishMatches);
      const result = await matchService.allMatches(false);
      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(matchesMock.finishMatches);
    });

    it('Deve atualizar uma partida ao acessar /updatedMatches/:id', async function () {
      sinon.stub(MatchService.prototype, 'updatedMatches').resolves({ status: 'SUCCESSFUL', data: 'Match updated' });
      const { status, body } = await chai.request(app).put("/updatedMatches/1").send({ homeTeamGoals: 2, awayTeamGoals: 1 })
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal('Match updated');
    });
    /*
    it('Deve criar uma nova partida ao acessar /createdMatches', async function () {
      sinon.stub(MatchService.prototype, 'createdMatch').resolves({ status: 'CREATED' , data: matchesMock.NewTeam});
      const { status, body } = await chai.request(app).post("/createdMatches").send(matchesMock.NewMatches);
      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(matchesMock.NewTeam);
    });

    it('Deve retornar status 422 para equipes de mesmo ID', function () {
      const req = { body: { homeTeamId: 1, awayTeamId: 1 } } as Request;
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as Response;
      const next = sinon.stub();
  
      ValidateMatch.validateMatch(req, res, next);
  
      expect(res.status.calledWith(422)).to.be.true;
      expect(res.json.calledWith({ message: 'It is not possible to create a match with two equal teams' })).to.be.true;
    });
  
    it('Deve chamar next() para equipes diferentes', function () {
      const req = { body: { homeTeamId: 1, awayTeamId: 2 } } as Request;
      const res = {} as Response;
      const next = sinon.stub();
  
      ValidateMatch.validateMatch(req, res, next);
  
      expect(next.called).to.be.true;
    }); */
  });
