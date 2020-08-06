import request from 'supertest';

import app from '@shared/infra/http/app';

import { bankEnum } from '@modules/bankAccounts/dtos/BankEnum';
import { userOne, userTwo } from './mock/user';
import { banckAccountOne } from './mock/banckAccount';

let token: string | null = null;
let bank: bankEnum;

export default function fileTests(): void {
  beforeAll(async () => {
    const responseToken = await request(app).post('/sessions').send({
      cpf: userOne.cpf,
      password: userOne.password,
    });
    token = responseToken.body.token;

    const responseUser = await request(app)
      .get('/users')
      .query(`cpf=${userTwo.cpf}`)
      .set('Authorization', `Bearer ${token}`);

    expect(responseUser.body).toHaveProperty('id');
    Object.assign(userTwo, { id: responseUser.body.id });
  });

  it('should be able to get the list of banks', async () => {
    const response = await request(app)
      .get('/bankaccounts/banks')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toBeInstanceOf(Array);
    bank = response.body[0] as bankEnum;
  });

  it('should be able to create a new bank account', async () => {
    const response = await request(app)
      .post('/bankaccounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: userTwo.name,
        account: banckAccountOne.account,
        agency: banckAccountOne.agency,
        bank,
        cnpj: null,
        cpf: userOne.cpf,
        operation: null,
        type: banckAccountOne.type,
        user_id: userTwo.id,
      });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('account', banckAccountOne.account);
    expect(response.body).toHaveProperty('agency', banckAccountOne.agency);
  });

  it('should be able to get bank account', async () => {
    const response = await request(app)
      .get('/bankaccounts')
      .query(`user_id=${userTwo.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', userTwo.name);
    expect(response.body).toHaveProperty('account', banckAccountOne.account);
    expect(response.body).toHaveProperty('agency', banckAccountOne.agency);
    expect(response.body).toHaveProperty('bank', bank);
  });
}
