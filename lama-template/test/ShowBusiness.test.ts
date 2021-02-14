import { ShowBusiness } from "../src/business/ShowBusiness";

describe("Testing register show", () => {
  const idGenerator = { generateId: jest.fn(() => "test") } as any;
  let authenticator = { generateToken: jest.fn() } as any;
  let bandDatabase = { createUser: jest.fn() } as any;
  test("Sucess", async () => {
    
    const showBusiness: ShowBusiness = new ShowBusiness(
      authenticator,
      idGenerator,
      bandDatabase
    );

    const input = {
      band_id: "e8d7b126-7a11-4697-8916-8c087f0d7edc",
      week_day: "SEXTA",
      start_time: 8,
      end_time: 9,
      token: "tokenTest",
    };

    try {
      await showBusiness.schedule(input);
    } catch (error) {
      
    }
  });
});
