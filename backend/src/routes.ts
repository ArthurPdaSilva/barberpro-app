import { Request, Response, Router } from "express";
import CheckSubscriptionController from "./controllers/haircut/CheckSubscriptionController";
import CreateHaircutController from "./controllers/haircut/CreateHaircutController";
import DetailHaircutController from "./controllers/haircut/DetailHaircutController";
import CountHaircutController from "./controllers/haircut/CountHaircutController";
import UpdateHaircutController from "./controllers/haircut/UpdateHaircutController";
import NewScheduleController from "./controllers/schedule/NewScheduleController";
import AuthUserController from "./controllers/user/AuthUserController";
import CreateUserController from "./controllers/user/CreateUserController";
import DetailUserController from "./controllers/user/DetailUserController";
import ListHaircutController from "./controllers/haircut/ListHaircutController";
import UpdateUserController from "./controllers/user/UpdateUserController";
import { Auth } from "./middlewares/auth";
import ListScheduleController from "./controllers/schedule/ListScheduleController";

export const router = Router();

// Rotas User
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', Auth, new DetailUserController().handle);
router.put('/users', Auth, new UpdateUserController().handle);

// Rotas Haircut
router.post('/haircut', Auth, new CreateHaircutController().handle);
router.get('/haircuts', Auth, new ListHaircutController().handle);
router.put('/haircut', Auth, new UpdateHaircutController().handle);
router.get('/haircut/check', Auth, new CheckSubscriptionController().handle);
router.get('/haircut/count', Auth, new CountHaircutController().handle);
router.get('/haircut/detail', Auth, new DetailHaircutController().handle);

// Rotas Schedule / Services
router.post('/schedule', Auth, new NewScheduleController().handle);
router.get('/schedules', Auth, new ListScheduleController().handle);