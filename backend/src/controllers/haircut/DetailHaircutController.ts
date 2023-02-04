import { Request, Response } from "express";
import CheckSubscriptionService from "../../services/haircut/CheckSubscriptionService";
import DetailHaircutService from "../../services/haircut/DetailHaircutService";

export default class DetailHaircutController {
    async handle(req: Request, res: Response) {
        const haircut_id = req.query.haircut_id as string
        console.log()
        const haircut = await new DetailHaircutService().execute({
            haircut_id
        });

        return res.json(haircut);
    }
}