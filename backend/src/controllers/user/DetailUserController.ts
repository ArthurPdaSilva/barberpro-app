import { Request, Response } from "express";
import DetailUserService from "../../services/user/DetailUserService";

export default class DetailUserController {
    async handle(req: Request, res: Response) {
        const user = await new DetailUserService().execute(req.user_id);
        return res.json(user);
    }
}