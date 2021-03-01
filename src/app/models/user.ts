import { Roles } from "./roles";

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    myCustomData?: string;
    emailVerified?:boolean;
    role?:any;
}

