import { Request, Response } from "express";
import ListScheduleService from "../../services/schedule/ListScheduleService";

export default class ListScheduleController {
    async handle(req: Request, res: Response) {
        const schedule = await new ListScheduleService().execute({
            user_id: req.user_id,
        });

        return res.json(schedule);
    }
}