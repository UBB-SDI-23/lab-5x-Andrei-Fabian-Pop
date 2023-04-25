import {Email} from "./Email";
import {Event} from "./Event";

export interface EmailToEvent {
    id?: number;
    name: string;
    details: string;
    email_id: Email;
    event_id: Event;
}
