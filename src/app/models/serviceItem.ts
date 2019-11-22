import { Vehicle } from './vehicle';

export class ServiceItem{
    id: number;
    name: String;
    type_id: number;
    cost: number;
    date: Date;
    techNote: String;
    userNote: String;
    vehicle_id: number;
    user_id: number;
    receiptURL: String;
    vehicle: Vehicle; //for creating or updating

    constructor(){
        
    }
}