import { CustomError } from "../errors/CustomError";

export interface AuthenticationData {
    id: string;
    role?: string;
}

export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: USER_ROLE
    ) { }

    static stringToUserRole(input: string): USER_ROLE {
        switch (input) {
            case "NORMAL":
                return USER_ROLE.NORMAL;
            case "ADMIN":
                return USER_ROLE.ADMIN;
            default:
                throw new CustomError(422, "Invalid user role");
        }
    }
}

export interface UserInputDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginInputDTO {
    email: string;
    password: string;
}
export enum USER_ROLE {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN",
}
