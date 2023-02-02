import { Request, Response } from "express";
import NewScheduleService from "../../services/schedule/NewScheduleService";

export default class NewScheduleController {
    async handle(req: Request, res: Response) {
        const { haircut_id, customer } = req.body;
        const schedule = await new NewScheduleService().execute({
            customer,
            haircut_id,
            user_id: req.user_id
        });

        return res.json(schedule);
    }
}