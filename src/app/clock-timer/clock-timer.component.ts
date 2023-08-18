import { Component } from '@angular/core';

@Component({
  selector: 'app-clock-timer',
  templateUrl: './clock-timer.component.html',
  styleUrls: ['./clock-timer.component.css']
})
export class ClockTimerComponent {
  scheduleData: any[] = [];
  currentPageIndex = 1;
  itemsPerPage = 5; // Adjust as needed
  settingsFormVisible: boolean = false;
  customSettingsFormVisible: boolean = false;

  constructor() {
    // setInterval(this.capNhatTrangThaiTuDong.bind(this), 10000);
  }
  show_timer_CloseVal(closeVal: string) {
    this.settingsFormVisible = true;
    console.log("sdf");
  }
  showCustomSettings_CloseVal(string = "") {
    this.customSettingsFormVisible = true;
  }
  show_timer_LowPressure(string = "") {
    this.settingsFormVisible = true;
  }
  showCustomSettings_LowPressre(string = "") {
    this.customSettingsFormVisible = true;
  }
  show_timer_HightPressure(string = "") {
    this.settingsFormVisible = true;
  }
  showCustomSettings_HightPressure(string = "") {
    this.customSettingsFormVisible = true;
  }
  show_timer_OpenVal(string = "") {
    this.settingsFormVisible = true;
  }
  showCustomSettings_OpenVal(string = "") {
    this.customSettingsFormVisible = true;
  }
  closeCustomForm() {
    this.customSettingsFormVisible = false;
  }
  updateCustomSetting() {

  }
  deleteCustomSetting() {

  }
  closeForm() {
    this.settingsFormVisible = false;
  }
  addSchedule() {

  }

}
