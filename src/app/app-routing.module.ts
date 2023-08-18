import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResovleProblemComponent } from './resovle-problem/resovle-problem.component';
import { ClockTimerComponent } from './clock-timer/clock-timer.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resovle-problem', component: ResovleProblemComponent },
  { path: 'clock-timer', component: ClockTimerComponent },
  { path: 'map', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
