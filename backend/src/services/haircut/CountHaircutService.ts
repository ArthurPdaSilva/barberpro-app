import prisma from "../../prisma";

interface HaircutRequest {
    user_id: string;
}

export default class CountHaircutService {
    async execute({ user_id }: HaircutRequest) {
        // Buscar quantos modelos ele tem
        const count = await prisma.haircut.count({
            where: {
                user_id: user_id
            }
        })

        return count;
    }
}