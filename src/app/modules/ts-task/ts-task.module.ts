import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { DialogAddEditComponent } from './task/dialog-add-edit/dialog-add-edit.component';
import { DialogConfirmComponent } from './task/dialog-confirm/dialog-confirm.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TsTaskRoutingModule } from './ts-task-routing.module';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    TaskComponent,
    DialogAddEditComponent,
    DialogConfirmComponent,
    ListTaskComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TsTaskRoutingModule
  ],
  providers: [
    SnackBarComponent
  ]
})
export class TsTaskModule { }
