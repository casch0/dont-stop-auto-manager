import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServiceItemService } from 'src/app/services/service-item.service';
import { ServiceItem } from 'src/app/models/serviceItem';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-technician',
  templateUrl: './profile-technician.component.html',
  styleUrls: ['./profile-technician.component.scss']
})
export class ProfileTechnicianComponent implements OnInit {
  editForm: FormGroup;
  vForm: FormGroup;
  selectedService: ServiceItem;

  user: User;
  profileID: String;
  serviceItems = <ServiceItem[]>[];
  technicianServices = <ServiceItem[]>[];
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

    this.profileID = this.router.url.match(/\d+$/)[0];
    this.user = <User>await this.loginService.getUser(this.profileID);
    this.serviceItems = <ServiceItem[]>await this.SIS.getVehicleServices('1'); //replace with technician's upcoming services
    this.technicianServices = <ServiceItem[]> await this.SIS.getTechnicianServices(this.profileID); //replace with technician's upcoming services
    this.populateServiceList();
  }

  populateServiceList() {
    this.futureServices = [];
    this.requestedServices = [];

    let now = new Date().getTime();
    for (let s of this.serviceItems) {
      let sTime = new Date(s.date).getTime();
      if (sTime >= now){
        this.futureServices.push(s);
      }
    }

    for (let s of this.technicianServices) {
      if (s.vehicle_id == null){
        if(s.date == null){
          this.availableServiceItems.push(s);
        } else {
          this.requestedServices.push(s);
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

  selectService(s: ServiceItem){
    this.selectedService = s;
  }
}
