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

  photo: File;

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
    if(this.editVehicleForm.value['name']) v.name = this.editVehicleForm.value['name'];
    if(this.editVehicleForm.value['vin']) v.vin = this.editVehicleForm.value['vin'];
    if(this.editVehicleForm.value['year']) v.year = this.editVehicleForm.value['year'];
    if(this.editVehicleForm.value['make']) v.make = this.editVehicleForm.value['make'];
    if(this.editVehicleForm.value['model']) v.model = this.editVehicleForm.value['model'];
    if(this.editVehicleForm.value['color']) v.color = this.editVehicleForm.value['color'];
    if(this.editVehicleForm.value['mileage']) v.mileage = this.editVehicleForm.value['mileage'];
    //v.photoURL = '/assets/car-default.png'; //   TODO ADD picture (after S3 integration)

    let p: String;

    console.log(this.photo);

    this.vehicleService.uploadPhoto(v.id, this.photo).subscribe((data: Vehicle) => {
      v.photo = data.photo;
      this.vehicle = v;
      this.vehicleService.updateVehicle(v).subscribe(
        data => console.log(data)
      );
    });

    setTimeout(()=>{
      this.ngOnInit();
    },100);
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
    }, 100);
    this.type = null;
  }

  onFileChange(event) {
    this.photo = event.target.files[0];
    console.log(this.photo);
  }

}
