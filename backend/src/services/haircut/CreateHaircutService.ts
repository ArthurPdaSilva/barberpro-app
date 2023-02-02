import prisma from "../../prisma";

interface HaircutRequest {
    user_id: string;
    name: string;
    price: number;
}

export default class CreateHaircutService {
    async execute({ user_id, name, price  }: HaircutRequest) {
        if(!name || !price) throw new Error("Failed datas");

        // Buscar quantos modelos ele tem
        const myHaircuts = await prisma.haircut.count({
            where: {
                user_id: user_id
            }
        })

        // Verificar se é premium
        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                subscriptions: true
            }
        })

        // Limitar
        if(myHaircuts >= 3 && user?.subscriptions?.status !== 'active') {
            throw new Error("Not authorized")
        }
        
        const haircut = await prisma.haircut.create({
            data: {
                name,
                price,
                user_id
            }
        })

        return haircut;
    }
}