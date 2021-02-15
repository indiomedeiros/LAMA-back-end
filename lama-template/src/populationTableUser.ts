import { UserInputDTO } from "./business/entities/User";
import { Authenticator } from "./business/service/Authenticatior";
import { HashManager } from "./business/service/HashManager";
import { IdGenerator } from "./business/service/IdGenerator";
import { UserBusiness } from "./business/UserBusiness";
import { UserDatabase } from "./data/UserDatabase";

const populationTableUser = new UserBusiness(
  new IdGenerator(),
  new HashManager(),
  new Authenticator(),
  new UserDatabase()
);

export class PopulationUsers {
  fillTablesUsers = async () => {
    const user1: UserInputDTO = {
      email: "diana@gmail.com",
      password: "12345678",
      name: "Diana",
      role: "ADMIN",
    };

    const user2: UserInputDTO = {
      email: "indio@gmail.com",
      password: "12345678",
      name: "Indio",
      role: "NORMAL",
    };
    const arrayUsers = [user1, user2];
    try {
      for (let user of arrayUsers) {
        populationTableUser.createUser(user);
        
      }
    } catch (error) {
      console.log(error.sqlMessage || error.message);
    }
  };
}
