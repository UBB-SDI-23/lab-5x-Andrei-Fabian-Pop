// import { Email } from "./Email";

export interface Email {
    id: number;
    address: string;
    corporate_email: boolean;
    user_full_name: string;
    language: string;
    country: string;
}

export interface EmailNoId {
    address: string;
    corporate_email: boolean;
    user_full_name: string;
    language: string;
    country: string;
}

