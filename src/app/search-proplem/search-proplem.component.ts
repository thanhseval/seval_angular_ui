import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-proplem',
  templateUrl: './search-proplem.component.html',
  styleUrls: ['./search-proplem.component.css']
})
export class SearchProplemComponent {
  constructor(public dialogRef: MatDialogRef<SearchProplemComponent>,
  ) { }
  clickCancel() {
    this.dialogRef.close();
  }
}
