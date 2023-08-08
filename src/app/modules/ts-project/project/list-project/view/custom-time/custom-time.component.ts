import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-time',
  templateUrl: './custom-time.component.html',
  styleUrls: ['./custom-time.component.scss']
})
export class CustomTimeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomTimeComponent>) {
    this.customTimeForm = this.fb.group({
      dateStart: [''],
      dateEnd: [''],
    });
  }

  ngOnInit(): void {
  }

  customTimeForm!: FormGroup;

  onSubmit(){
    this.dialogRef.close(this.customTimeForm.value);
  }
}
