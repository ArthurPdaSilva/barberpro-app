import { Request, Response } from "express";
import FinishScheduleService from "../../services/schedule/FinishScheduleService";

export default class FinishScheduleController {
    async handle(req: Request, res: Response) {
        const schedule = await new FinishScheduleService().execute({
            user_id: req.user_id,
            schedule_id: req.query.schedule_id as string
        });

        return res.json(schedule);
    }
}