import { UserDatabase } from "../data/UserDatabase"
import { UserInputDTO, User} from "./entities/User"
import { IdGenerator } from "./service/IdGenerator"
import { HashManager } from "./service/HashManager"
import { Authenticator } from "./service/Authenticatior"
import { CustomError } from "./errors/CustomError"

export class UserBusiness {
    constructor(
        private idGenarator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private userDatabase: UserDatabase,
    ){}

    public async createUser(input: UserInputDTO) {
        try {
            if (!input.name || !input.email || !input.password) {
                throw new CustomError(406, "Please provide a 'name', an 'email' and a 'password'")
            }

            const id: string = this.idGenarator.generateId()

            const cypherPassword = await this.hashManager.hash(input.password)

            const newUser: User = new User(
                id,
                input.name,
                input.email,
                cypherPassword,
                User.stringToUserRole(input.role)
            )

            await this.userDatabase.insertUser(newUser)

            const accessToken: string = this.authenticator.generateToken({ 
                id, 
                role: input.role})

            return accessToken
            
        } catch (error) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }
    }
}
