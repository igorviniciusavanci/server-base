import request from 'supertest';

import app from '@shared/infra/http/app';

import { userOne, userTwo } from './mock/user';
import { addressOne } from './mock/address';

let token: string | null = null;

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

  it('should be able to create a new address', async () => {
    const response = await request(app)
      .post('/adresses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        neighborhood: addressOne.neighborhood,
        postal_code: addressOne.postal_code,
        address: addressOne.address,
        user_id: userTwo.id,
      });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty(
      'neighborhood',
      addressOne.neighborhood,
    );
    expect(response.body).toHaveProperty('postal_code', addressOne.postal_code);
    expect(response.body).toHaveProperty('address', addressOne.address);
  });

  it('should be able to get address', async () => {
    const response = await request(app)
      .get('/adresses')
      .query(`user_id=${userTwo.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty(
      'neighborhood',
      addressOne.neighborhood,
    );
    expect(response.body).toHaveProperty('postal_code', addressOne.postal_code);
    expect(response.body).toHaveProperty('address', addressOne.address);
  });
}
