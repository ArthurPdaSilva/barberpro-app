import { Request, Response, Router } from "express";
import AuthUserController from "./controllers/user/AuthUserController";
import CreateUserController from "./controllers/user/CreateUserController";
import DetailUserController from "./controllers/user/DetailUserController";
import UpdateUserController from "./controllers/user/UpdateUserController";
import { Auth } from "./middlewares/auth";

export const router = Router();

// Rotas User
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', Auth, new DetailUserController().handle);
router.put('/users', Auth, new UpdateUserController().handle);