import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'api_postgresql',
  port: 5432,
  username: 'api',
  password: 'api',
  database: 'api',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
