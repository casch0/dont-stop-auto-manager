import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServiceItemService } from 'src/app/services/service-item.service';
import { ServiceItem } from 'src/app/models/serviceItem';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Type } from 'src/app/models/type';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-profile-technician',
  templateUrl: './profile-technician.component.html',
  styleUrls: ['./profile-technician.component.scss']
})
export class ProfileTechnicianComponent implements OnInit {
  editForm: FormGroup;
  addNewServiceForm: FormGroup;
  selectedService: ServiceItem;
  type: number;

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
    private formBuilder: FormBuilder
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
        if (s.vehicle_id == 0) {
          this.availableServiceItems.push(s);
        } else if (!s.userNote) {
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
    usr.firstName = this.editForm.value['firstName'];
    usr.lastName = this.editForm.value['lastName'];
    usr.email = this.editForm.value['email'];
    //usr.pictureURL = '/assets/profile-default.png';    TODO ADD picture (after S3 integration)

    this.loginService.updateUser(usr).subscribe(
      () => console.log(usr)
    );

    this.ngOnInit();
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
    }, 50);
    this.type = null;
  }

  requestService() {
    console.log(this.selectedService);
  }

  deleteService(s: ServiceItem) {
    this.SIS.deleteService(s);
  }
}
