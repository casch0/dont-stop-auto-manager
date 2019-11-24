import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ServiceItemService } from 'src/app/services/service-item.service';
import { ServiceItem } from 'src/app/models/serviceItem';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editForm: FormGroup;
  vForm: FormGroup;
  selectedService: ServiceItem;

  user: User;
  profileID: String;
  vehicles: Vehicle[];
  serviceItems: ServiceItem[];

  pastServices = <ServiceItem[]>[];
  futureServices = <ServiceItem[]>[];

  constructor(
    private loginService: LoginService,
    private vehicleService: VehicleService,
    private SIS: ServiceItemService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.loginService.checkOnline();

    this.editForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
    });

    this.vForm = this.formBuilder.group({
      name: '',
      vin: '',
      year: '',
      make: '',
      model: '',
      color: '',
      mileage: '',
      // photoURL: 'assets/car-default.png',
    });

    this.profileID = this.router.url.match(/\d+$/)[0];
    this.loginService.getUser(this.profileID).subscribe(
      u => this.user = u
    );

    this.loginService.getServices(this.profileID).subscribe(
      items => this.serviceItems = items
    );

    this.loginService.getUserVehicles(this.profileID).subscribe(
      items => this.vehicles = items
    );
    
    setTimeout(() => {
      this.loginService.checkUserType(this.user);
      this.populateServiceList();
    }, 100);
  }

  getVehicleURL(v: Vehicle) {
    let s = '/vehicle/' + v.id;
    return s;
  }

  populateServiceList() {
    this.pastServices = [];
    this.futureServices = [];

    let now = new Date().getTime();
    for (let s of this.serviceItems) {
      let sTime = new Date(s.time).getTime();
      if (sTime <= now) {
        this.pastServices.push(s);
      } else {
        this.futureServices.push(s);
      }
    }
  }

  editUser() {
    let usr = this.loginService.currentUser;

    if (this.editForm.value['firstName'] != '')
      usr.firstName = this.editForm.value['firstName'];
    if (this.editForm.value['lastName'] != '')
      usr.lastName = this.editForm.value['lastName'];
    if (this.editForm.value['email'] != '')
      usr.email = this.editForm.value['email'];

    usr.photo = ''; //TODO after S3
    usr.password = 'replaceME';
    usr.role = new Role();
    usr.role.id = usr.roleId;

    this.loginService.currentUser = usr;

    this.loginService.updateUser(usr).subscribe(
      () => console.log(usr)
    );

    setTimeout(() => this.ngOnInit(), 200);

  }

  newVehicle() {
    let v = new Vehicle();
    v.user = this.loginService.currentUser;
    v.name = this.vForm.value['name'];
    v.vin = this.vForm.value['vin'];
    v.year = this.vForm.value['year'];
    v.make = this.vForm.value['make'];
    v.model = this.vForm.value['model'];
    v.color = this.vForm.value['color'];
    v.mileage = this.vForm.value['mileage'];
    // v.photoURL = '/assets/car-default.png'; //   TODO ADD picture (after S3 integration)

    this.vehicleService.createVehicle(v).subscribe(
      () => console.log(v)
    );

    setTimeout(() => {
      this.ngOnInit();
    }, 100);
  }

  selectService(s: ServiceItem) {
    this.selectedService = s;
  }

}
