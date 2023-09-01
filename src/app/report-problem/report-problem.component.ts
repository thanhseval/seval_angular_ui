import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

interface IncidentType {
  value: string;
  viewValue: string;
}
interface Supervisor {
  value: string;
  viewValue: string;
}
interface Status {
  value: string;
  viewValue: string;
}
interface Performer {
  value: string;
  viewValue: string;
}
interface RemediationInformation {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.css']
})
export class ReportProblemComponent {
  constructor(public dialogRef: MatDialogRef<ReportProblemComponent>,
  ) { }
  incidentTypes: IncidentType[] = [
    { value: 'type-0', viewValue: 'Loại 1' },
    { value: 'type-1', viewValue: 'Loại 2' },
  ];
  supervisors: Supervisor[] = [
    { value: 'supervisor-0', viewValue: 'Nguyễn Tấn Hưng' },
    { value: 'supervisor-1', viewValue: 'Gia Huy' },
    { value: 'supervisor-2', viewValue: 'Thành Công' },
  ];
  status: Status[] = [
    { value: 'status-0', viewValue: 'Đã sửa chữa' },
    { value: 'status-1', viewValue: 'Chưa sửa chữa' },
  ];
  performers: Performer[] = [
    { value: 'performer-0', viewValue: 'Gia Huy' },
    { value: 'performer-1', viewValue: 'Nguyễn Tấn Hưng' },
    { value: 'performer-2', viewValue: 'Thành Công' },
  ];
  remediationInformations: RemediationInformation[] = [
    { value: 'remediationInformation-0', viewValue: 'Cần tái lập' },
    { value: 'remediationInformation-1', viewValue: 'Không cần tái lập' },
  ];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  clickCancel() {
    this.dialogRef.close();
  }
}
