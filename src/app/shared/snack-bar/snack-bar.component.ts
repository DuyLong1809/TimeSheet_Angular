import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, bg: string) {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = 2000;
    snackBarConfig.verticalPosition = 'bottom';
    snackBarConfig.horizontalPosition = 'end';
    snackBarConfig.panelClass = [bg];
    this.snackBar.open(message, '', snackBarConfig);
  }
}
