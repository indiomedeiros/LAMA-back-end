import { BandBusiness } from "../src/business/BandBusiness";
import { BandInputDTO } from "../src/business/entities/Band";

describe("Testing register band", () => {
  const idGenerator = { generate: jest.fn(() => "test") } as any;
  let authenticator = { generateToken: jest.fn() } as any;
  let bandDatabase = { createUser: jest.fn() } as any;
 
  test("Shoulder return error when 'name' is empty", async () => {
    expect.assertions(2);

    const bandBusiness: BandBusiness = new BandBusiness(
      idGenerator,
      authenticator,
      bandDatabase
    );

    const input: BandInputDTO = {
      name: "",
      music_genre: "Rock",
      responsible: "John Lennon",
    };

    const token = "tokenTest";

    try {
      await bandBusiness.createBand(input, token);
    } catch (error) {
      expect(error.message).toEqual(
        "Please provide a 'name', 'music_genre' and 'responsible"
      );
      expect(error.statusCode).toBe(406);
    }
  });

  // test("Error when 'name' is empty", async () => {
  //   expect.assertions(2);

  //   const bandBusiness: BandBusiness = new BandBusiness(
  //     idGenerator,
  //     authenticator,
  //     bandDatabase
  //   );

  //   const input: BandInputDTO = {
  //     name: "",
  //     music_genre: "Rock",
  //     responsible: "John Lennon",
  //   };

  //   const token = "tokenTest";

  //   try {
  //     await bandBusiness.createBand(input, token);
  //   } catch (error) {
  //     expect(error.message).toBe(
  //       "Please provide a 'name', 'music_genre' and 'responsible"
  //     );
  //     expect(error.statusCode).toBe(422);
  //   }
  // });

  // test("Error when 'music_genre' is empty", async () => {
  //   expect.assertions(2);
  //   const bandBusiness: BandBusiness = new BandBusiness(
  //     idGenerator,
  //     authenticator,
  //     bandDatabase
  //   );

  //   const input: BandInputDTO = {
  //     name: "Beatles",
  //     music_genre: "",
  //     responsible: "John Lennon",
  //   };

  //   const token = "tokenTest";

  //   try {
  //     await bandBusiness.createBand(input, token);
  //   } catch (error) {
  //     expect(error.message).toBe(
  //       "Please provide a 'name', 'music_genre' and 'responsible"
  //     );
  //     expect(error.statusCode).toBe(422);
  //   }
  // });
});
