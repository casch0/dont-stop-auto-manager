import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ServiceItem } from 'src/app/models/serviceItem';
import { Vehicle } from 'src/app/models/vehicle';
import { ServiceItemService } from 'src/app/services/service-item.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Type } from 'src/app/models/type';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  editVehicleForm: FormGroup;
  addPastServiceForm: FormGroup;

  vehicle: Vehicle;
  vehicleID: String;
  serviceItems: ServiceItem[];
  selectedService: ServiceItem;
  type: number;

  pastServices = <ServiceItem[]>[];
  futureServices = <ServiceItem[]>[];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private vehicleService: VehicleService,
    private SIS: ServiceItemService,
    private formBuilder: FormBuilder,
    private serviceItemService: ServiceItemService
  ) { }

  async ngOnInit() {

    this.editVehicleForm = this.formBuilder.group({
      name: '',
      vin: '',
      year: '',
      make: '',
      model: '',
      color: '',
      mileage: '',
      // photoURL: 'assets/car-default.png',
    });

    this.addPastServiceForm = this.formBuilder.group({
      name: '',
      type: null,
      cost: null,
      date: null,
      note: '',
      receiptURL: ''
    });

    this.loginService.checkOnline();
    this.vehicleID = this.router.url.match(/\d+$/)[0];
    this.vehicle = <Vehicle>await this.vehicleService.getVehicle(this.vehicleID);
    this.serviceItems = <ServiceItem[]>await this.vehicleService.getVehicleServices(this.vehicleID);
    console.log(this.serviceItems);
    this.populateServiceList();

  }

  populateServiceList() {
    this.pastServices = [];
    this.futureServices = [];

    let now = new Date().getTime();
    for (let s of this.serviceItems) {
      let sTime = new Date(s.time).getTime();
      console.log(s.time);
      if (sTime <= now) {
        this.pastServices.push(s);
      } else {
        this.futureServices.push(s);
      }
    }
  }

  updateVehicle() {
    let v = this.vehicle;
    v.name = this.editVehicleForm.value['name'];
    v.vin = this.editVehicleForm.value['vin'];
    v.year = this.editVehicleForm.value['year'];
    v.make = this.editVehicleForm.value['make'];
    v.model = this.editVehicleForm.value['model'];
    v.color = this.editVehicleForm.value['color'];
    v.mileage = this.editVehicleForm.value['mileage'];
    //v.photoURL = '/assets/car-default.png'; //   TODO ADD picture (after S3 integration)

    this.vehicleService.updateVehicle(v).subscribe(
      () => console.log(v)
    );

    this.ngOnInit();
  }

  selectService(s: ServiceItem) {
    this.selectedService = s;
  }

  addPastService() {
    let s = new ServiceItem;
    s.name = this.addPastServiceForm.value['name'];
    s.cost = this.addPastServiceForm.value['cost'];
    s.userNote = this.addPastServiceForm.value['note'];
    s.type = new Type();
    s.type.id = this.type;
    let d = new Date(this.addPastServiceForm.value['date']);    
    d.setHours(d.getHours() + 4);
    s.time = d;
    s.vehicle = this.vehicle;
    console.log(s);

    this.serviceItemService.createServiceItem(s).subscribe(
      () => console.log(s)
    );

    setTimeout(()=>{
      this.ngOnInit();
    }, 3);
    this.type = null;
  }

}
