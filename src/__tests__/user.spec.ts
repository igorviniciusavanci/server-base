import request from 'supertest';

import { app } from '@shared/infra/http/server';

import { userOne } from './mock/user';

export default function userTests(): void {
  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: userOne.name,
      cpf: userOne.cpf,
      email: userOne.email,
      birthday: userOne.birthday,
      password: userOne.password,
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        name: userOne.name,
        cpf: userOne.cpf,
        email: userOne.email,
      }),
    );
  });
}

//   it('should be able to create a new token', async () => {
//     const response = await request(server).post('/sessions').send({
//       cpf: userOne.cpf,
//       password: userOne.password,
//     });

//     expect(response.body).toHaveProperty('token');
//     expect(response.body).toHaveProperty('user');
//     token = response.body.token;
//   });

//   it('should be able to create another user', async () => {
//     const response = await request(server).post('/users').send({
//       name: userTwo.name,
//       cpf: userTwo.cpf,
//       email: userTwo.email,
//       birthday: userTwo.birthday,
//       password: userTwo.password,
//     });
//     expect(response.body).toEqual(
//       expect.objectContaining({
//         name: userTwo.name,
//         cpf: userTwo.cpf,
//         birthday: userTwo.birthday,
//         email: userTwo.email,
//       }),
//     );
//   });

//   it('should be able to get user with token', async () => {
//     const response = await request(server)
//       .get('/users')
//       .set('Authorization', `Bearer ${token}`);

//     expect(response.body).toEqual(
//       expect.objectContaining({
//         name: userOne.name,
//         cpf: userOne.cpf,
//         birthday: userOne.birthday,
//         email: userOne.email,
//       }),
//     );
//   });

//   it('should be able to get user by CPF', async () => {
//     const response = await request(server)
//       .get('/users')
//       .query(`cpf=${userTwo.cpf}`)
//       .set('Authorization', `Bearer ${token}`);

//     expect(response.body).toHaveProperty('id');
//     Object.assign(userTwo, { id: response.body.id });

//     expect(response.body).toEqual(
//       expect.objectContaining({
//         name: userTwo.name,
//         cpf: userTwo.cpf,
//         email: userTwo.email,
//       }),
//     );
//   });

//   it('should be able to get user by id', async () => {
//     const response = await request(server)
//       .get('/users')
//       .query(`user_id=${userTwo.id}`)
//       .set('Authorization', `Bearer ${token}`);

//     expect(response.body).toEqual(
//       expect.objectContaining({
//         name: userTwo.name,
//         cpf: userTwo.cpf,
//         email: userTwo.email,
//       }),
//     );
//   });

//   it('should be able to throw a error when try register another user with same cpf', async () => {
//     const response = await request(server).post('/users').send({
//       name: userOne.name,
//       cpf: userOne.cpf,
//       email: userOne.email,
//       birthday: userOne.birthday,
//       password: userOne.password,
//     });
//     expect(response.body).toHaveProperty('message', 'CPF already existe');
//     expect(response.body).toHaveProperty('status', 'error');
//   });
// }
