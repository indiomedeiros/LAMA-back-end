import * as jwt from"jsonwebtoken";
import {AuthenticationData} from "../entities/User"

export class Authenticator {
    public genarateToken(payload: AuthenticationData): string {
        return jwt.sign(payload, process.env.JWT_KEY as string, {
        expiresIn: process.env.JWT_EXPIRE_IN
    });
    }

    public getTokenData(token: string): AuthenticationData {
        const result: any = jwt.verify(token, process.env.JWT_KEY as string);

        return{
            id: result.id,
            role: result.role
        }
    }
}