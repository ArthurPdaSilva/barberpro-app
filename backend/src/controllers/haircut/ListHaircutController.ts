import { Request, Response } from "express";
import ListHaircutService from "../../services/haircut/ListHaircutService";

export default class ListHaircutController {
    async handle(req: Request, res: Response) {
        const haircuts = await new ListHaircutService().execute({
            user_id: req.user_id,
            status: req.query.status as string
        });

        return res.json(haircuts);
    }
}