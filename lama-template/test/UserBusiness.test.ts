import { UserInputDTO } from "../src/business/entities/User";
import { UserBusiness } from "../src/business/UserBusiness";

describe("Testing register user", () => {
  const idGenerator = { generate: jest.fn(() => "test") } as any;
  let hashManager = { hash: jest.fn(), compare: jest.fn() } as any;
  let authenticator = { generateToken: jest.fn() } as any;
  let userDatabase = { createUser: jest.fn() } as any;

  test("Shoulder return error when name is empty", async () => {
    expect.assertions(2);

    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "",
      email: "diana-monteiro@gmail.com",
      password: "1234567",
      role: "ADMIN",
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe(
        "Please provide a 'name', 'password' and 'role'"
      );
      expect(error.statusCode).toBe(406);
    }
  });

  test("Shoulder return error when password is empty", async () => {
    expect.assertions(2);

    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "Diana",
      email: "",
      password: "1234567",
      role: "ADMIN",
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe("Invalid e-mail");
      expect(error.statusCode).toBe(406);
    }
  });

  test("Shoulder return error when role is empty", async () => {
    expect.assertions(2);

    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "Diana",
      email: "diana-monteiro@gmail.com",
      password: "12345678",
      role: "",
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe(
        "Please provide a 'name', 'password' and 'role'"
      );
      expect(error.statusCode).toBe(406);
    }
  });

  test("Shoulder return sucess case", async () => {
   

    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "Diana",
      email: "diana-monteiro@gmail.com",
      password: "12345678",
      role: "ADMIN",
    };

    try {
      await userBusiness.createUser(input);
      expect(userDatabase.insertUser).toHaveBeenCalled()
      expect(userDatabase.insertUser).toHaveBeenCalledWith(input)
    } catch (error) {
      
    }
  });
});
