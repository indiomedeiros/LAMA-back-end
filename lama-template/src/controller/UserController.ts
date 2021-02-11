import { Request, Response } from "express"
import { UserBussines } from "../bussines/UserBussines"
import { UserInputDTO } from "../bussines/entities/User"
import { IdGenerator } from "../bussines/service/IdGenerator"
import { HashManager } from "../bussines/service/HashManager"
import { Authenticator } from "../bussines/service/Authenticatior"
import { UserDatabase } from "../data/UserDatabase"

const userBussines = new UserBussines(
    new IdGenerator(),
    new HashManager,
    new Authenticator(),
    new UserDatabase()
)

export class UserController {
    
    public async createUser(req: Request, res:Response) {
        try {
            const {name, email, password, role} = req.body
            const input: UserInputDTO = {
                name,
                email,
                password,
                role
            }

            const token = await userBussines.createUser(input)
            res.status(200).send({token});
        }catch (error) {
            res.status(error.statusCode).send(error.sqlMessage || error.message)
        }
    } 
}