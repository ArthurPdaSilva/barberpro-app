import { hash } from "bcryptjs";
import prisma from "../../prisma";

interface ScheduleRequest {
    user_id: string,
    haircut_id: string;
    customer: string;
}

export default class NewScheduleService {
    async execute({ user_id, haircut_id, customer}: ScheduleRequest) {
        if(customer === '' || haircut_id === '') throw new Error("Failed in the new Schedule");
        
        const schedule = await prisma.service.create({
            data: {
                customer,
                haircut_id,
                user_id
            }
        })

        return schedule;
    }
}