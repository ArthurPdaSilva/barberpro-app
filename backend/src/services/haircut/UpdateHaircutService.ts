import prisma from "../../prisma";

interface HaircutRequest {
    user_id: string;
    haircut_id: string;
    name: string;
    price: number;
    status: boolean | string;
}

export default class UpdateHaircutService {
    async execute({ user_id, name, price, haircut_id, status = true  }: HaircutRequest) {
        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                subscriptions: true
            }
        })

        // if(user?.subscriptions?.status !== 'active') {
            // throw new Error("Not authorized")
        // }
        
        const haircut = await prisma.haircut.update({
            where: {
                id: haircut_id
            },
            data: {
                name,
                price,
                status: status === true ? true : false
            }
        })

        return haircut;
    }
}