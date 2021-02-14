import { UserDatabase } from "../data/UserDatabase";
import { UserInputDTO, User, LoginInputDTO } from "./entities/User";
import { IdGenerator } from "./service/IdGenerator";
import { HashManager } from "./service/HashManager";
import { Authenticator } from "./service/Authenticatior";
import { CustomError } from "./errors/CustomError";
import { CheckData } from "./errors/CheckData";

export class UserBusiness {
  constructor(
    private idGenarator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private userDatabase: UserDatabase
  ) {}

  public async createUser(userInputDTO: UserInputDTO):Promise<string> {
    try {
      const { name, password, email, role } = userInputDTO;
      const check = new CheckData();

      check.checkExistenceProperty(name, "name");
      check.checkExistenceProperty(role, "role");
      check.checkPasswordFormat(password);
      check.checkEmailFormat(email);

      const id: string = this.idGenarator.generateId();

      const cypherPassword = await this.hashManager.hash(password);

      const newUser: User = new User(
        id,
        name,
        email,
        cypherPassword,
        User.stringToUserRole(role)
      );

      await this.userDatabase.insertUser(newUser);

      const accessToken: string = this.authenticator.generateToken({
        id,
        role: role,
      });

      return accessToken;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }

  public async getUserByEmail(loginInputDTO: LoginInputDTO):Promise<string> {
    try {
      const { email, password } = loginInputDTO;
      const check = new CheckData();

      check.checkPasswordFormat(password);
      check.checkEmailFormat(email);

      const user: User = await this.userDatabase.selectUser(email);
      check.checkExistenceObject(user, "Invalid credentials");

      const passwordIsCorrect: boolean = await this.hashManager.compare(
        password,
        user.password
      );

      check.checkExistenceObject(passwordIsCorrect, "Invalid credentials");

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
