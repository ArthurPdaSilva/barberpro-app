import { Request, Response } from "express";
import ListHaircutService from "../../services/haircut/ListHaircutService";
import UpdateHaircutService from "../../services/haircut/UpdateHaircutService";

export default class UpdateHaircutController {
    async handle(req: Request, res: Response) {
        const { name, price, status, haircut_id } = req.body;
        const haircuts = await new UpdateHaircutService().execute({
            user_id: req.user_id,
            name,
            price,
            status,
            haircut_id
        });

        return res.json(haircuts);
    }
}