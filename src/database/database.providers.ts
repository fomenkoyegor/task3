import { Sequelize } from 'sequelize-typescript';
import { Category } from '../notes/models/category.entity';
import { Note } from '../notes/models/note.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
      });
      sequelize.addModels([Note, Category]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
