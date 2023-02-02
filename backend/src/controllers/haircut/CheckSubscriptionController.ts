import { Request, Response } from "express";
import CheckSubscriptionService from "../../services/haircut/CheckSubscriptionService";
import CreateHaircutService from "../../services/haircut/CreateHaircutService";

export default class CheckSubscriptionController {
    async handle(req: Request, res: Response) {
        const status = await new CheckSubscriptionService().execute({
            user_id: req.user_id
        });

        return res.json(status);
    }
}