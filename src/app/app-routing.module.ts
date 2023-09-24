import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResovleProblemComponent } from './resovle-problem/resovle-problem.component';
import { ClockTimerComponent } from './clock-timer/clock-timer.component';
import { MapComponent } from './map/map.component';
import { SettingComponent } from './setting/setting.component';
import { ControllerPumpComponent } from './controller-pump/controller-pump.component';
import { LoginComponent } from './login/login.component';
import { ControllIotComponent } from './controll-iot/controll-iot.component';
import { ThresholdComponent } from './threshold/threshold.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'resovle-problem', component: ResovleProblemComponent },
  { path: 'clock-timer', component: ClockTimerComponent },
  { path: 'map', component: MapComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'controller-pump', component: ControllerPumpComponent },
  { path: 'controller-iot', component: ControllIotComponent },
  { path: 'threshold', component: ThresholdComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
