import { Vehicle } from './vehicle';
import { Type } from 'src/app/models/type';
import { User } from './user';

export class ServiceItem{
    id: number;
    name: String;
    serviceTypeId: number;
    type: Type;
    cost: number;
    time: Date;
    technicianNote: String;
    userNote: String;
    vehicleId: number;
    userId: number;
    receiptURL: String;
    vehicle: Vehicle; //for creating or updating
    user: User;

    constructor(){
        
    }
}