import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const envFile =
  __dirname + `/../../../deployment/config/${process.env.NODE_ENV}/.env`;
require('dotenv').config({ path: envFile });

console.log(`[${process.env.NODE_ENV}] The application is running`);
console.log(
  `- Database: host=${process.env.POSTGRES_HOST} port=${process.env.POSTGRES_PORT} user=${process.env.POSTGRES_USER} name=${process.env.POSTGRES_DB}\n`,
);

var config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  synchronize: false,
  entities: [__dirname + '/../../**/entities/*.entity{.ts,.js}'],
  migrations: [`src/modules/database/migrations/${process.env.NODE_ENV}/*.js`],
  cli: {
    migrationsDir: `src/modules/database/migrations/${process.env.NODE_ENV}`,
  },
};

export default config;
