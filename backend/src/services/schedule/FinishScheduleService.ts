import { hash } from "bcryptjs";
import prisma from "../../prisma";

interface ScheduleRequest {
    schedule_id: string,
    user_id: string
}

export default class FinishScheduleService {
    async execute({ user_id, schedule_id }: ScheduleRequest) {
        if(schedule_id === '' || user_id === '') throw new Error("Failed");

        try {
            const belongsToUser = await prisma.service.findFirst({
                where: {
                    id: schedule_id,
                    user_id: user_id
                }
            })

            if(!belongsToUser) throw new Error("Not authorized");
            await prisma.service.delete({
                where: {
                    id: schedule_id
                }

            })

            return { message: "completed successfully"};
        } catch (error) {
           console.log(error);
            throw new Error(error as string);
        }  
        
    }
}