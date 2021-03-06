import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { VehicleComponent } from '../components/vehicle/vehicle.component';
import { ProfileTechnicianComponent } from '../components/profile-technician/profile-technician.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'technician/:id', component: ProfileTechnicianComponent },
  { path: 'vehicle/:id', component: VehicleComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
