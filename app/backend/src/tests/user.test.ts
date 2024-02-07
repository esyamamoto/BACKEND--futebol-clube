import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { userInvalid, emailInvalid, passwordInvalid, loginOk } from './mocks/user.Mocks';   
import { app } from '../app';
import SequelizeUserModel from '../database/models/Sequelize.User.Model';
import ValidateLogin from '../middlewares/validateLogin';
import UserController from '../controller/user.controller';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste users login', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('Verifica se retorna error 400 INVALID_DATA sem os campos', async function() {
    const {status, body} = await chai.request(app).post('/login');
    expect(status).to.equal(400);
    expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
  })
  it('Verifica se retorna error com email inválido', async function() {
    const {status, body} = await chai.request(app).post('/login').send(emailInvalid);
    
    expect(status).to.equal(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
  })

  it('Verifica se retorna error sem senha ', async function() {
    const {status, body} = await chai.request(app).post('/login').send(passwordInvalid)
    
    expect(status).to.equal(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
  })

  it('Verifica se retorna error com email com formato errado', async function() {
    const {status, body} = await chai.request(app).post('/login').send(emailInvalid);
    
    expect(status).to.equal(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
  })

  it('Verifica se retorna error sem token no role', async function() {
    const {status, body} = await chai.request(app).get('/login/role').send();
    
    expect(status).to.equal(401);
    expect(body).to.be.deep.eq({ message: 'Token not found' });
  })

  it('Verifica se retorna error com senha incorreta', async function() {
    const {status, body} = await chai.request(app).post('/login').send(passwordInvalid);
    
    expect(status).to.equal(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
  })

  it('deve retornar erro 500 ao encontrar erro ao buscar usuário', async () => {
    sinon.stub(SequelizeUserModel, 'findOne').throws(new Error('Internal Server Error'));
    const { status, body } = await chai.request(app).post('/login').send(loginOk);
    expect(status).to.equal(500);
    expect(body).to.be.deep.eq({ message: 'Internal Server Error' });
  });

  it('Deve retornar erro 401 para token de autorização inválido', async function () {
    const { status } = await chai.request(app).get("/login/role").set('Authorization', 'Bearer invalidToken');
    expect(status).to.be.equal(401);
  });

  
});
