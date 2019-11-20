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
        pictureURL: 'https://i.kym-cdn.com/photos/images/newsfeed/000/813/218/fe5.jpg',
      },
      {
        id: 2,
        email: 'technician@gmail.com',
        password: 'password',
        role_id: 2,
        company_id: 1,
        firstName: 'Martin',
        lastName: 'Cordero',
        pictureURL: 'https://cdn3.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumb900.jpg',
      },
    ];

    const vehicles = [
      {
        id: 1,
        name: 'myTank',
        VIN: '1HGBH41JXMN109186',
        year: 1948,
        make: 'toy',
        model: 'tank',
        color: 'orange',
        mileage: 999,
        user_id: 1,
        insurance_id: 1,
        photoURL: 'https://i5.walmartimages.com/asr/a2de0031-0ee4-4635-a4ae-4bfc79a1dce5_1.6475bbff2702d1f46bd9cc56dd53e3b0.jpeg',
      },

      {
        id: 2,
        name: 'myCar',
        VIN: '1HGBH41JXMN109186',
        year: 2014,
        make: 'chevrolet',
        model: 'camaro',
        color: 'red',
        mileage: 404,
        user_id: 1,
        insurance_id: 1,
        photoURL: 'https://i.pinimg.com/originals/44/e4/5b/44e45b50adf92faf956977ff3ac48908.jpg',
      },

      {
        id: 3,
        name: "Grant's car",
        VIN: '1HGBH41JXMN109186',
        year: 3000,
        make: 'Mars',
        model: 'Rover',
        color: 'gray',
        mileage: 404,
        user_id: 1,
        insurance_id: 1,
        photoURL: 'https://s.yimg.com/ny/api/res/1.2/HVKMS.cGhVv47TgwgorpYQ--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en_US/News/BGR_News/rover.jpg?quality=98&amp;strip=all',
      },

      {
        id: 4,
        name: 'Grants warthog',
        VIN: '1HGBH41JXMN109186',
        year: 5045,
        make: 'USS',
        model: 'Warthog',
        color: 'Green',
        mileage: 0,
        user_id: 1,
        insurance_id: 1,
        photoURL: 'https://ca-times.brightspotcdn.com/dims4/default/9512534/2147483647/strip/true/crop/600x400+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F69%2F22%2F6143abf25b9fcd8c2940f01d93b0%2Fla-xpm-photo-2012-dec-24-la-fi-hy-autos-halo-warthog-drive-20121222',
      },
    ];
    const services = [
      {
        id: 1,
        name: 'replaced front bumper',
        type_id: 2,
        cost: 100,
        date: new Date(1996,1,1,0,0,0,0),
        techNote: 'i did it',
        userNote: 'he did it',
        vehicle_id: 1,
        user_id: 1,
        receiptURL: ''
      },

      {
        id: 2,
        name: 'replaced rims',
        type_id: 2,
        cost: 100,
        date: new Date(),
        techNote: 'i did it',
        userNote: 'he did it',
        vehicle_id: 1,
        user_id: 1,
        receiptURL: ''
      },

      {
        id: 3,
        name: 'added sun roof',
        type_id: 4,
        cost: 100,
        date: new Date(2020,1,1,0,0,0,0),
        techNote: 'i did it',
        userNote: 'he did it',
        vehicle_id: 1,
        user_id: 1,
        receiptURL: ''
      },
    ];
    return { users, vehicles, services };
  }

  // genId(tickets: Ticket[]): number {
  //   return tickets.length > 0 ? Math.max(...tickets.map(ticket => ticket.id)) + 1 : 1000;
  // }
}