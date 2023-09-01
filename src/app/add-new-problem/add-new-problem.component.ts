import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-problem',
  templateUrl: './add-new-problem.component.html',
  styleUrls: ['./add-new-problem.component.css']
})
export class AddNewProblemComponent {
  constructor(public dialogRef: MatDialogRef<AddNewProblemComponent>,
    ) { }

  dateControl = new FormControl();
  minDate: Date | undefined; // Set your min date value
  maxDate: Date | undefined; // Set your max date value
  disabled = false;
    
  showSpinners = true;
  showSeconds = true;
  stepHour = 1;
  stepMinute = 1;
  stepSecond = 1;
  touchUi = false;
  color = "primary";
  enableMeridian = true;
  disableMinute = false;
  hideTime = false;

  clickCancel() {
    this.dialogRef.close();
  }

}
