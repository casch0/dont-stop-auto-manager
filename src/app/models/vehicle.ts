import { User } from './user';

export class Vehicle{

    id: number;
    name: String;
    vin: String;
    year: number;
    make: String;
    model: String;
    color: String;
    mileage: number;
    userId: number;
    insuranceId: number;
    photoURL: String;
    serviceReportIds: number[];

    constructor(){
    }
}