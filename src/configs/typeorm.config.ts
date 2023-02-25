import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface ConfigParams {
  username: string;
  password: string;
  database: string;
}

export function typeORMConfig({
  username,
  password,
  database,
}: ConfigParams): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username,
    password,
    database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  };
}
