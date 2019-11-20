import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ServiceItem } from 'src/app/models/serviceItem';
import { Vehicle } from 'src/app/models/vehicle';
import { ServiceItemService } from 'src/app/services/service-item.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  editVehicle: FormGroup;
  serviceModal: FormGroup;
  vehicle: Vehicle;
  vehicleID: String;
  serviceItems: ServiceItem[];


  pastServices = <ServiceItem[]>[];
  futureServices = <ServiceItem[]>[];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private vehicleService: VehicleService,
    private SIS: ServiceItemService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {

    this.editVehicle = this.formBuilder.group({
      name: '',
      vin: '',
      year: '',
      make: '',
      model: '',
      color: '',
      mileage: '',
      photoURL: 'assets/car-default.png',
    });

    this.serviceModal = this.formBuilder.group({
      cost: '',
      note: '',
    });

    this.loginService.checkOnline();
    this.vehicleID = this.router.url.match(/\d+$/)[0];
    this.vehicle = <Vehicle>await this.vehicleService.getVehicle(this.vehicleID);
    this.serviceItems = <ServiceItem[]>await this.SIS.getVehicleServices(this.vehicleID);
    this.populateServiceList();

  }

  populateServiceList() {
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

  newVehicle() {
    let v = new Vehicle();
    v.name = this.editVehicle.value['name'];
    v.VIN = this.editVehicle.value['vin'];
    v.year = this.editVehicle.value['year'];
    v.make = this.editVehicle.value['make'];
    v.model = this.editVehicle.value['model'];
    v.color = this.editVehicle.value['color'];
    v.mileage = this.editVehicle.value['mileage'];
    v.photoURL = '/assets/car-default.png'; //   TODO ADD picture (after S3 integration)

    v.user_id = this.loginService.currentUser.id;
    

    this.vehicleService.createVehicle(v).subscribe(
      () => console.log(v)
    );

    this.ngOnInit();
  }
}
