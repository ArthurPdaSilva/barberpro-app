import { Request, Response } from "express";
import CheckSubscriptionService from "../../services/haircut/CheckSubscriptionService";
import DetailHaircutService from "../../services/haircut/DetailHaircutService";

export default class DetailHaircutController {
    async handle(req: Request, res: Response) {
        const haircut = await new DetailHaircutService().execute({
            haircut_id: req.query.haircut_id as string
        });

        return res.json(haircut);
    }
}