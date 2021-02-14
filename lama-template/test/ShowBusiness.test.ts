import { ShowBusiness } from "../src/business/ShowBusiness";

describe("Testing register show", () => {
    const idGenerator = { generate: jest.fn(() => "test") } as any;
    let authenticator = { generateToken: jest.fn() } as any;
    let bandDatabase = { createUser: jest.fn() } as any;

    expect.assertions(1);

    const showBusiness: ShowBusiness = new ShowBusiness(
      authenticator,
      idGenerator,
      bandDatabase
    );

    const input= {
        band_id:"484654" , 
        week_day:"FRIDAY" , 
        start_time: 1, 
        end_time: 0,
    };

    const token = "tokenTest";

    try {
       showBusiness.schedule(input, token);

    } catch (error) {
      expect(error.statusCode).toBe(400);
      // expect(error.message).toBe(
      //   "Please provide a 'name', 'music_genre' and 'responsible"
      // );
    }
  });
