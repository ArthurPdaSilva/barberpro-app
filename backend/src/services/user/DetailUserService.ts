import { sign } from "jsonwebtoken";
import prisma from "../../prisma";


export default class DetailUserService {
    async execute(user_id: string) {

        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                address: true,
                subscriptions: {
                    select: {
                        id: true,
                        price_id: true,
                        status: true
                    }
                }
            }
        })

        return user;
    }
}