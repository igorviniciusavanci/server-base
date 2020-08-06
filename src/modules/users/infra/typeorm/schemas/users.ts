import { EntitySchema } from 'typeorm';

import IUser from '@modules/users/entities/IUser';

export default new EntitySchema<IUser>({
  name: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
    },
    cpf: {
      type: 'varchar',
      unique: true,
    },
    email: {
      type: 'varchar',
      unique: true,
      nullable: true,
    },
    birthday: {
      type: 'date',
      nullable: true,
    },
    active: {
      type: 'boolean',
      default: true,
    },
    password: {
      type: 'varchar',
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      default: 'now()',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp',
      default: 'now()',
      updateDate: true,
    },
  },
  // relations: {
  //   files: {
  //     type: 'one-to-many',
  //     target: 'files',
  //     inverseSide: 'users',
  //   },
  // },
});
