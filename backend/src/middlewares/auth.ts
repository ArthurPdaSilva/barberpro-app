import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string
}

export function Auth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if(!authToken) return res.status(401).end();
    const [, token] = authToken.split(" ");
    try {
        // Sub: id do usuário
        const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload
        req.user_id = sub;
        next();
    } catch (error) {
        return res.status(401).end();
    }

}