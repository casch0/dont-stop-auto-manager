import { Vehicle } from './vehicle';
import { Type } from 'src/app/models/type';
import { User } from './user';

export class ServiceItem{
    id: number;
    name: String;
    type_id: number;
    type: Type;
    cost: number;
    time: Date;
    technicianNote: String;
    userNote: String;
    vehicle_id: number;
    user_id: number;
    receiptURL: String;
    vehicle: Vehicle; //for creating or updating
    user: User;

    constructor(){
        
    }
}