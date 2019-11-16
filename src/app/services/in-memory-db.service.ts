import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        email: 'customer@gmail.com',
        password: 'password',
        role_id: 1,
        company_id: null,
        firstName: 'Grant',
        lastName: 'Moser',
        pictureURL: null
      },
      {
        id: 2,
        email: 'technician@gmail.com',
        password: 'password',
        role_id: 2,
      },
    ];

    const vehicles = [
      {
        id: 1,
        name: 'myCar',
        VIN: '1HGBH41JXMN109186',
        year: 1948,
        make: 'ford',
        model: 'angular',
        color: 'orange',
        mileage: 404,
        user_id: 1,
        insurance_id: 1
      },
    ];
    const services = [
      {
        id: 1,
        name: 'replaced front bumper',
        type_id: 1,
        cost: 100,
        date: new Date(),
        techNote: 'i did it',
        userNote: 'he did it',
        vehicle_id: 1,
        user_id: 1,
      },
    ];
    return { users, vehicles, services };
  }

  // Overrides the genId method to ensure that a ticket always has an id.
  // If the tickets array is empty,
  // the method below returns the initial number (11).
  // if the tickets array is not empty, the method below returns the highest
  // ticket id + 1.
  // genId(tickets: Ticket[]): number {
  //   return tickets.length > 0 ? Math.max(...tickets.map(ticket => ticket.id)) + 1 : 1000;
  // }
}