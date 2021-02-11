import { BaseDatabase } from "./BaseDatabase"
import { User } from "../bussines/entities/User"
import { CustomError } from "../bussines/errors/CustomError"

export class UserDatabase extends BaseDatabase {

    private static tableName = "NOME_TABELAS_USUÁRIOS"

    private static toUserModel(user: User): User {
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            User.stringToUserRole(user.role)
        );
    }

    public async insertUser(user: User): Promise<void> {
        try {
            await BaseDatabase.connection
            .insert({
               id: user.id,
               email: user.email,
               name: user.name,
               password: user.password,
               role: User.roleToString(user.role)
            })
            .into(UserDatabase.tableName)
        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred");
         }
    }
}