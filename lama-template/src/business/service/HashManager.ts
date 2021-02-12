import * as bcrypt from "bcryptjs"

export class HashManager {
    private cost: number = Number(process.env.BCRYPT_COST)

    public hash: (text:string) => Promise<string> = async (
        plainText: string
    ): Promise<string> => {
        const rounds = Number(this.cost);
        const salt = await bcrypt.genSalt(rounds);
        return bcrypt.hash(plainText, salt)
    }

    public compare = async ( 
        plainText: string, cypherText: string
        ): Promise<boolean> => {
            return bcrypt.compare(plainText, cypherText)
        }
}

