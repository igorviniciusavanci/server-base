import request from 'supertest';

import app from '@shared/infra/http/app';

import { fileTypes } from '@modules/files/dtos/FileTypes';
import { userOne, userTwo } from './mock/user';

let token: string | null = null;
let fileType: fileTypes;

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

  it('should be able to get the list of types', async () => {
    const response = await request(app)
      .get('/files/types')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toBeInstanceOf(Array);
    fileType = response.body[0] as fileTypes;
  });

  it('should be able to create a new file', async () => {
    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token}`)
      .field('type', fileType)
      .field('user_id', userTwo.id)
      .attach('file', `${__dirname}/mock/files/file.pdf`);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to get files by user id', async () => {
    const response = await request(app)
      .get('/files')
      .query(`user_id=${userTwo.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toBeInstanceOf(Array);

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('type', fileType);
  });
}
