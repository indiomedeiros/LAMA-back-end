import { UserDatabase } from "../data/UserDatabase";
import { UserInputDTO, User, LoginInputDTO, USER_ROLE } from "./entities/User";
import { IdGenerator } from "./service/IdGenerator";
import { HashManager } from "./service/HashManager";
import { Authenticator } from "./service/Authenticatior";
import { CustomError } from "./errors/CustomError";

export class UserBusiness {
  constructor(
    private idGenarator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private userDatabase: UserDatabase
  ) {}

  public async createUser(input: UserInputDTO) {
    try {
      if (!input.name || !input.password) {
        throw new CustomError(406, "Please provide a 'name'and a 'password'");
      }

      if (!input.email || input.email.indexOf("@") === -1) {
        throw new Error("Invalid e-mail");
      }

      const id: string = this.idGenarator.generateId();

      const cypherPassword = await this.hashManager.hash(input.password);

      const newUser: User = new User(
        id,
        input.name,
        input.email,
        cypherPassword,
        User.stringToUserRole(input.role)
      );

      await this.userDatabase.insertUser(newUser);

      const accessToken: string = this.authenticator.generateToken({
        id,
        role: input.role,
      });

      return accessToken;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }

  public async getUserByEmail(input: LoginInputDTO) {
    try {
      if (!input.email || !input.password) {
        throw new CustomError(400, '"email" and "password" must be provided');
      }

      if (input.email.indexOf("@") === -1) {
        throw new Error("Email inválido");
      }

      const user: User = await this.userDatabase.selectUser(input.email);

      if (!user) {
        throw new CustomError(404, "Invalid credentials");
      }

      const passwordIsCorrect: boolean = await this.hashManager.compare(
        input.password,
        user.password
      );

      if (!passwordIsCorrect) {
        throw new CustomError(404, "Invalid credentials");
      }

      const accessToken: string = this.authenticator.generateToken({
        id: user.id,
        role: user.role,
      });

      return accessToken;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }
}
