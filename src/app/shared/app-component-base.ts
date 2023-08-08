import { Component } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";
@Component({
    selector: 'app-task',
    template: '',
})

export class AppComponentBase {

    isSaving: boolean = false
    isLoading: boolean = false;


    constructor() {

    }

    ngOnDestroy() {
    }


}