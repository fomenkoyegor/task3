import { Sequelize } from 'sequelize-typescript';
import { Category } from '../notes/models/category.entity';
import { Note } from '../notes/models/note.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DATABASE || 'postgres',
      });
      sequelize.addModels([Note, Category]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
