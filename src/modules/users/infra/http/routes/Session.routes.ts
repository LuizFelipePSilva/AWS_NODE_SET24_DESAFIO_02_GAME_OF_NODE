import { Router } from "express";
import SessionController from "../controllers/SessionController";
import { celebrate, Joi, Segments } from "celebrate";

const sessionController = new SessionController();
const sessionRoutes = Router();

// Rota para criar uma sessão (login)
sessionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(), // Defina a complexidade da senha, se necessário
    },
  }),
  sessionController.create
);

export default sessionRoutes;