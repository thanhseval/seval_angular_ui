import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { ResovleProblemComponent } from './resovle-problem/resovle-problem.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FlowChartComponent } from './flow-chart/flow-chart.component';
import { ClockTimerComponent } from './clock-timer/clock-timer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PressureChartComponent } from './pressure-chart/pressure-chart.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { AddNewProblemComponent } from './add-new-problem/add-new-problem.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { ReportProblemComponent } from './report-problem/report-problem.component';
import { MatSelectModule } from '@angular/material/select';
import { SearchProplemComponent } from './search-proplem/search-proplem.component';
import { LoginComponent } from './login/login.component';
import { SettingComponent } from './setting/setting.component';
import { ControllerPumpComponent } from './controller-pump/controller-pump.component';
import { RouterModule } from '@angular/router';
// import { AuthGuard } from './_auth/auth.guard';
// import { AuthInterceptor } from './_auth/auth.interceptor';
// import { UserService } from './_service/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ResovleProblemComponent,
    FlowChartComponent,
    ClockTimerComponent,
    PressureChartComponent,
    FooterComponent,
    MapComponent,
    AddNewProblemComponent,
    ReportProblemComponent,
    SearchProplemComponent,
    LoginComponent,
    SettingComponent,
    ControllerPumpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatSelectModule,
    MatNativeDateModule,
    RouterModule
  ],
  providers: [
    // AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    // UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
