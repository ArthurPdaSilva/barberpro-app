import prisma from "../../prisma";

interface HaircutRequest {
    user_id: string;
}

export default class CheckSubscriptionService {
    async execute({ user_id }: HaircutRequest) {

        const status = await prisma.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                subscriptions: {
                    select: {
                        id: true,
                        status: true
                    }
                }
            }
        })

        return status;
    }
}