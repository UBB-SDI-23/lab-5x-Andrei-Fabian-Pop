import {Email} from "./Email";

export interface Subscription {
    id?: number;
    name: string;
    description: string;
    price: number;
    period: string;
    period_paid: number;
    mail: Email;
}
