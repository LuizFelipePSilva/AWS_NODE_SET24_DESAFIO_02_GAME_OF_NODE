module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER || 'compassuser',
  password: process.env.DB_PASS || 'compasspass',
  database: process.env.DB_NAME || 'compasscar_db',
  synchronize: true,
  logging: false,
  entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/shared/infra/typeorm/migrations',
  },
};
