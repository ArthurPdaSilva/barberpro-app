import prisma from "../../prisma";

interface HaircutRequest {
    user_id: string;
    status: boolean | string;
}

export default class ListHaircutService {
    async execute({ user_id, status  }: HaircutRequest) {
        const myHaircuts = await prisma.haircut.findMany({
            where: {
                user_id,
                status: status === 'true' ? true : false
            }
        })

        return myHaircuts;
    }
}