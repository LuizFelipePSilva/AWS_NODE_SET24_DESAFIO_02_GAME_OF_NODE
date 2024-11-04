module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST ,
  port: parseInt(process.env.DB_PORT) ,
  username: process.env.DB_USER ,
  password: process.env.DB_PASS ,
  database: process.env.DB_NAME ,
  synchronize: false ,
  logging: false,
  entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/shared/infra/typeorm/migrations',
  },
};
