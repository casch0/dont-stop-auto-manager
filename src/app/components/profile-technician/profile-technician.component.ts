import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServiceItemService } from 'src/app/services/service-item.service';
import { ServiceItem } from 'src/app/models/serviceItem';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Type } from 'src/app/models/type';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-profile-technician',
  templateUrl: './profile-technician.component.html',
  styleUrls: ['./profile-technician.component.scss']
})
export class ProfileTechnicianComponent implements OnInit {
  editForm: FormGroup;
  addNewServiceForm: FormGroup;
  addreqServiceForm: FormGroup;

  photo: File;

  selectedService: ServiceItem;
  type: number;
  serviceDate: Date;

  user: User;
  profileID: String;
  serviceItems = <ServiceItem[]>[];

  availableServiceItems = <ServiceItem[]>[];
  requestedServices = <ServiceItem[]>[];

  futureServices = <ServiceItem[]>[];

  constructor(
    private loginService: LoginService,
    private SIS: ServiceItemService,
    private router: Router,
    private formBuilder: FormBuilder,
    private vService: VehicleService
  ) { }

  async ngOnInit() {
    this.loginService.checkOnline();


    this.editForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
    });

    this.addNewServiceForm = this.formBuilder.group({
      name: '',
      type: null,
      cost: null,
      technote: '',
    });

    this.addreqServiceForm = this.formBuilder.group({
      userNote: '',
      vid: ''
    });

    this.profileID = this.router.url.match(/\d+$/)[0];

    this.loginService.getUser(this.profileID).subscribe(
      u => this.user = u
    );
    this.loginService.getTechServices(this.profileID).subscribe(
      items => this.serviceItems = items
    );


    setTimeout(() => {
      console.log(this.serviceItems);
      this.populateServiceList();
    }, 200)

  }

  populateServiceList() {
    this.futureServices = [];
    this.requestedServices = [];
    this.availableServiceItems = [];

    let now = new Date().getTime();

    for (let s of this.serviceItems) {
      if (s.time == null) {
        if (s.vehicleId == 0) {
          this.availableServiceItems.push(s);
        } else if (!s.time) {
          this.requestedServices.push(s);
        }
      } else {
        let sTime = new Date(s.time).getTime();
        if (sTime >= now) {
          this.futureServices.push(s);
        }
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

    let p: String;

    console.log(this.photo);

    this.loginService.uploadPhoto(usr.id, this.photo).subscribe((data: User) => {
      usr.photo = data.photo;
      this.loginService.currentUser = usr;
      this.loginService.updateUser(usr).subscribe(data => console.log(data));
    });

    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }

  onFileChange(event) {
    this.photo = event.target.files[0];
    console.log(this.photo);
  }

  selectService(s: ServiceItem) {
    this.selectedService = s;
  }

  addNewService() {
    let s = new ServiceItem;
    s.name = this.addNewServiceForm.value['name'];
    s.cost = this.addNewServiceForm.value['cost'];
    s.technicianNote = this.addNewServiceForm.value['technote'];
    s.type = new Type();
    s.type.id = this.type;
    s.vehicle = new Vehicle();
    s.vehicle.id = 0;
    s.user = this.loginService.currentUser;

    this.SIS.createServiceItem(s).subscribe(
      () => console.log(s),
      () => console.log(s)
    );

    setTimeout(() => {
      this.ngOnInit();
    }, 100);
    this.type = null;
  }

  async requestService(s: ServiceItem) {
    s.userNote = this.addreqServiceForm.value['userNote'];
    s.vehicle = await this.vService.getVehicle(this.addreqServiceForm.value['vid']);
    s.user = this.user;
    s.type = new Type();
    s.type.id = s.serviceTypeId;

    setTimeout(() => this.SIS.createServiceItem(s).subscribe(thing => console.log(thing)), 100);
  }

  deleteService(s: ServiceItem) { //does nothing yet
    console.log('deleting: ' + s.name);
    this.SIS.deleteService(s);
  }

  async acceptRequest(s: ServiceItem) {
    if (this.serviceDate) {
      console.log(this.serviceDate);
      s.time = this.serviceDate;
      // s.vehicle = await this.vService.getVehicle(this.addreqServiceForm.value['vid']);
      s.user = this.user;
      s.type = new Type();
      s.type.id = s.serviceTypeId;

      let d = new Date(this.serviceDate);
      d.setHours(d.getHours() + 4);
      s.time = d;

      this.SIS.updateService(s).subscribe(thing => console.log(thing));
    }
  }
}
