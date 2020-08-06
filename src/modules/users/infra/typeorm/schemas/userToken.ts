import { EntitySchema } from 'typeorm';

import IUserToken from '@modules/users/entities/IUserToken';

export default new EntitySchema<IUserToken>({
  name: 'user_tokens',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    token: {
      type: 'uuid',
      generated: 'uuid',
    },
    user_id: {
      type: 'uuid',
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
  relations: {
    user: {
      type: 'one-to-one',
      joinColumn: { name: 'user_id' },
      target: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
});
