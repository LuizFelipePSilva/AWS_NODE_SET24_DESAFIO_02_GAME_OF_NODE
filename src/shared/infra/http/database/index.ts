import { createConnection } from 'typeorm';
import createAdminUser from '../middlewares/createAdminForDefault';

createConnection()
  .then(async () => {
    console.log('📦 Conexão com o banco de dados estabelecida com sucesso!');
    
    await createAdminUser();
  })
  .catch((error) =>
    console.log('Erro ao conectar com o banco de dados:', error)
  );
