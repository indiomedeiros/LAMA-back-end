import * as jwt from"jsonwebtoken";
import {AuthenticationData} from "../entities/User"

export class Authenticator {
    public generateToken(
      payload: AuthenticationData,
      expiresIn: string = process.env.JWT_EXPIRES_IN!
      ): string {
        return jwt.sign(payload, process.env.JWT_KEY as string, {
        expiresIn,
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