import prisma from "../../prisma";

interface HaircutRequest {
    haircut_id: string;
}

export default class DetailHaircutService {
    async execute({ haircut_id }: HaircutRequest) {

        const haircut = await prisma.haircut.findFirst({
            where: {
                id: haircut_id
            },
        })

        return haircut;
    }
}