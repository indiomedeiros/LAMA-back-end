import { BandBusiness } from "../src/business/BandBusiness";
import { BandInputDTO, CreateBandInputDTO } from "../src/business/entities/Band";
import { USER_ROLE } from "../src/business/entities/User";

const idGenerator = { generate: jest.fn(() => "test") } as any;
  const authenticator = { generateToken: jest.fn((payload: {id: string, role: USER_ROLE}) => "token_test"),
  getdata: jest.fn ((token: string) => {
    switch(token){
      case "userToken":
        return {id: "token_id", role: "NORMAL"}
        case "tokenAdmin":
          return {id: "token_id", role: "ADMIN"}
        default:
          return undefined
    }
  }) 
  }
  let bandDatabase = { createUser: jest.fn() } as any;


  const bandBusiness: BandBusiness = new BandBusiness(
    authenticator as any,
    idGenerator,
    bandDatabase 
  );


describe("Testing register band", () => {
  
 
  test("sucess!", async () => {
  
    const input: CreateBandInputDTO = {
      name: "Diana",
      music_genre: "Rock",
      responsible: "John Lennon",
      token: "tokenAdmin",
    };

    try {
      await bandBusiness.createBand(input);

    } catch (error) {
     
    }
  });
});
