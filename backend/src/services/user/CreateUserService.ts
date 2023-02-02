import { hash } from "bcryptjs";
import prisma from "../../prisma";

interface UserRequest {
    name: string,
    email: string,
    password: string
}

export default class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        if(!email) throw new Error("Email incorrect");
        
        const userAlreadyExists = await prisma.user.findFirst({
            where: { email }
        });
        
        if(userAlreadyExists) throw new Error("User/email already exists");

        const passwordHash = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash
            },
            select: {
                id: true, 
                name: true,
                email: true
            }
        })

        return user;
    }
}