import prisma from "../../prisma";

interface HaircutRequest {
    user_id: string;
}

export default class ListScheduleService {
    async execute({ user_id }: HaircutRequest) {
        const schedule = await prisma.service.findMany({
            where: {
                user_id,
            },
            select: {
                id: true,
                customer: true,
                haircut: true
            }
        })

        return schedule;
    }
}