import { Router, Request, Response } from 'express';

const routes = Router();

// CARS POST
routes.post('/cars', async (req: Request, res: Response) => {
  res.json({ message: 'Post Cars' });
});

// CARS GET ID
routes.get('/cars/:id', async (req: Request, res: Response) =>{
  res.json({ message: 'Get id Cars' });
})

// CARS GET ID
routes.get('/cars/', async (req: Request, res: Response) =>{
  res.json({ message: 'Get all Cars' });
})

// CARS DELETE ID
routes.get('/cars/:id', async (req: Request, res: Response) =>{
  res.json({ message: 'Delete id Cars' });
})

// CARS PATCH ID
routes.patch('/cars/', async (req: Request, res: Response) =>{
  res.json({ message: 'Edit id Cars' });
})

routes.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
routes.get('/helloworld', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
export default routes;
