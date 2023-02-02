import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prisma from "../../prisma";

interface UserRequest {
    email: string,
    password: string
}

export default class AuthUserService {
    async execute({ email, password }: UserRequest) {
        if(!email) throw new Error("Email incorrect");
        
        const user = await prisma.user.findFirst({
            where: { email },
            include: {
                subscriptions: true
            }
        });
        
        if(!user) throw new Error("Email/password incorrect");

        const passwordMatch = await compare(password, user.password);
        
        if(!passwordMatch) throw new Error("Email/password incorrect");

        // Gerar um token
        const token = sign({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET as string, {
            subject: user.id,
            expiresIn: '30d'
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user?.address,
            token: token,
            subscriptions: user.subscriptions ? {
                id: user.subscriptions.id,
                status: user.subscriptions.status
            } : null
        };
    }
}