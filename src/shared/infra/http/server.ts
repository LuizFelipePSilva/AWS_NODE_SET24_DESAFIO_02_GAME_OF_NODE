import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import './database/index'; // Importa as configurações de conexão
import routes from './routes/index.routes'; // Importa as rotas da aplicação
import '@shared/container'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes); // Define as rotas da aplicação

// Middleware de tratamento de erros
app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // Erros esperados
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  // Erros desconhecidos
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
