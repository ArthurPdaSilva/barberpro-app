import { Request, Response } from "express";
import CountHaircutService from "../../services/haircut/CountHaircutService";
import ListHaircutService from "../../services/haircut/ListHaircutService";

export default class CountHaircutController {
    async handle(req: Request, res: Response) {
        const count = await new CountHaircutService().execute({
            user_id: req.user_id,
        });

        return res.json(count);
    }
}