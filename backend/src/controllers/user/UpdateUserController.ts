import { Request, Response } from "express";
import AuthUserService from "../../services/user/AuthUserService";
import UpdateUserService from "../../services/user/UpdateUserService";

export default class UpdateUserController {
    async handle(req: Request, res: Response) {
        const { name, address } = req.body;
        const user = await new UpdateUserService().execute({
            user_id: req.user_id,
            name,
            address,
        });

        return res.json(user);
    }
}