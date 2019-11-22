import { Role } from './role';

export class User {
    id: number;
    email: String;
    password: String;
    role: Role;
    company: number;
    firstName: String;
    lastName: String;
    photo: String;
    roleId: number;

	constructor() {
    }
    
}