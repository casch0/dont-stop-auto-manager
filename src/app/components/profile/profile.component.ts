import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ServiceItemService } from 'src/app/services/service-item.service';
import { ServiceItem } from 'src/app/models/serviceItem';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editForm: FormGroup;
  vForm: FormGroup;

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
      photoURL: 'assets/car-default.png',
    });

    this.profileID = this.router.url.match(/\d+$/)[0];
    this.user = <User>await this.loginService.getUser(this.profileID);
    this.vehicles = <Vehicle[]>await this.vehicleService.getUserVehicles(this.user.id);
    this.serviceItems = <ServiceItem[]>await this.SIS.getVehicleServices('1'); //replace with aggregate vehicle services post-integration
    this.populateServiceList();


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
      let sTime = new Date(s.date).getTime();
      if (sTime <= now) {
        this.pastServices.push(s);
      } else {
        this.futureServices.push(s);
      }
    }
  }

  editUser() {
    let usr = this.loginService.currentUser;
    usr.firstName = this.editForm.value['firstName'];
    usr.lastName = this.editForm.value['lastName'];
    usr.email = this.editForm.value['email'];
    //usr.pictureURL = '/assets/profile-default.png';    TODO ADD picture (after S3 integration)

    this.loginService.updateUser(usr).subscribe(
      () => console.log(usr)
    );

    this.ngOnInit();
  }

  newVehicle() {
    let v = new Vehicle();
    v.name = this.vForm.value['name'];
    v.VIN = this.vForm.value['vin'];
    v.year = this.vForm.value['year'];
    v.make = this.vForm.value['make'];
    v.model = this.vForm.value['model'];
    v.color = this.vForm.value['color'];
    v.mileage = this.vForm.value['mileage'];
    v.photoURL = '/assets/car-default.png'; //   TODO ADD picture (after S3 integration)

    v.user_id = this.loginService.currentUser.id;
    

    this.vehicleService.createVehicle(v).subscribe(
      () => console.log(v)
    );

    this.ngOnInit();
  }
}
