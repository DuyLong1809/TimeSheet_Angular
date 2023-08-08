import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEditComponent } from '../dialog-add-edit/dialog-add-edit.component';
import { TaskComponent } from '../task.component';
import { Confirm } from 'src/app/shared/enum/ts-task-enum/confirm';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  @Input() lengthCommontask!: number;
  @Input() lengthOthertask!: number;
  @Input() othertasks!: any[];
  @Input() commontasks!: any[];

  archiveTask = Confirm.archive;
  unarchiveTask = Confirm.unarchive;
  deleteTask = Confirm.delete;

  taskSuccess: string = '';

  constructor(
    private task: TaskComponent,
    public dialog: MatDialog,
    private snackBarComponent: SnackBarComponent,
  ) { }

  ngOnInit(): void {

  }

  openDialogEdit(isEdit: boolean, name: string | undefined, type: number, id: number) {
    const dialogRef = this.dialog.open(DialogAddEditComponent, {
      data: {
        isEdit: isEdit,
        isName: name,
        isType: type,
        isId: id
      }
    });

    dialogRef.afterClosed().subscribe((rs) => {
      if (rs) {
        this.task.getAllTask();
      }
    });
  }

  toggleArchivenandDel(taskId: number, name: string, action: any) {
    
    if (action === this.archiveTask) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: {
          IdDel: taskId,
          nameTask: name,
          action: action,
          title: `Archive Task: ${name}`
        }
      });
      dialogRef.afterClosed().subscribe((rs) => {
        if (rs) {
          this.task.getAllTask();
          this.snackBarComponent.openSnackBar(`Archive Task: ${name}`, 'success_snackbar');
        }
      });

    } else if (action === this.unarchiveTask) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: {
          IdDel: taskId,
          nameTask: name,
          action: action,
          title: `Unarchive Task: ${name}`
        }
      });
      dialogRef.afterClosed().subscribe((rs) => {
        if (rs) {
          this.task.getAllTask();
          this.snackBarComponent.openSnackBar(`Unarchive Task: ${name}`, 'success_snackbar');
        }
      });

    } else if (action === this.deleteTask) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: {
          IdDel: taskId,
          nameTask: name,
          action: action,
          title: `Delete Task: ${name}`
          
        }
      });
      dialogRef.afterClosed().subscribe((rs) => {
        if (rs) {
          this.task.getAllTask();
          this.snackBarComponent.openSnackBar(`Delete Task: ${name}`, 'success_snackbar')
        }
      });
    }
    
  }
}
