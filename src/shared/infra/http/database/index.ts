import { createConnection } from 'typeorm';

createConnection()
  .then(() =>
    console.log('📦 Conexão com o banco de dados estabelecida com sucesso!')
  )
  .catch((error) =>
    console.log('Erro ao conectar com o banco de dados:', error)
  );
