import { Connection, getConnection } from 'typeorm';
import { server } from '@shared/infra/http/server';
import createConnection from '@shared/infra/typeorm/index';
import userTest from './user.spec';
// import fileTest from './File';
// import bankAccountTest from './BankAccount';
// import addressTest from './Address';

let connection: Connection;

describe('tests', () => {
  beforeAll(async done => {
    connection = await createConnection('test-connection');
    await connection.dropDatabase();
    await connection.synchronize();
    done();
  });

  afterAll(async done => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
    server.close();
    done();
  });

  describe('/users Tests', userTest);
  // describe('File Tests', fileTest);
  // describe('Bank Account Tests', bankAccountTest);
  // describe('Address Tests', addressTest);
});
