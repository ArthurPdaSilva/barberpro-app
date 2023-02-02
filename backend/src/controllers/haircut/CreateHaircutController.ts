import { Request, Response } from "express";
import CreateHaircutService from "../../services/haircut/CreateHaircutService";

export default class CreateHaircutController {
    async handle(req: Request, res: Response) {
        const { name, price } = req.body;
        const haircut = await new CreateHaircutService().execute({
            name,
            price,
            user_id: req.user_id
        });

        return res.json(haircut);
    }
}