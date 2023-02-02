import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prisma from "../../prisma";

interface UserRequest {
    user_id: string,
    name: string,
    address: string
}

export default class UpdateUserService {
    async execute({ user_id, name, address }: UserRequest) {
        try {
            const user = await prisma.user.findFirst({
                where: { id: user_id }
            });

            if(!user) throw new Error("User not exists");
            const userUpdated = await prisma.user.update({
                where: { id: user_id },
                data: {
                    name,
                    address
                },
                select: {
                    name: true,
                    email: true,
                    address: true
                }
            })

            return userUpdated;
        } catch (error) {
            console.log(error)
            throw new Error("Error an update the user!");
        }
    }
}