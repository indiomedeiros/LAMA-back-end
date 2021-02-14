import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserInputDTO, LoginInputDTO } from "../business/entities/User";
import { IdGenerator } from "../business/service/IdGenerator";
import { HashManager } from "../business/service/HashManager";
import { Authenticator } from "../business/service/Authenticatior";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness = new UserBusiness(
  new IdGenerator(),
  new HashManager(),
  new Authenticator(),
  new UserDatabase()
);

export class UserController {
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, role } = req.body;
      const userInputDTO: UserInputDTO = {
        name,
        email,
        password,
        role,
      };

      const token = await userBusiness.createUser(userInputDTO);
      res.status(200).send({ token });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const loginInputDTO: LoginInputDTO = {
        email,
        password,
      };

      const token = await userBusiness.getUserByEmail(loginInputDTO);

      res.status(200).send({ message: "User logged!", token });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
