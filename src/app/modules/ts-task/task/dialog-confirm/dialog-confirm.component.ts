import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../service/task.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppComponentBase } from 'src/app/shared/app-component-base';
import { Confirm } from 'src/app/shared/enum/ts-task-enum/confirm';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent extends AppComponentBase implements OnInit {

  private IdDel: number;
  nameTask: string;
  action: any;



  constructor(
    public snackBar: MatSnackBar,
    private snackBarComponent: SnackBarComponent,
    public dialogClose: MatDialogRef<DialogConfirmComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.IdDel = data.IdDel;
    this.nameTask = data.nameTask;
    this.action = data.action;
  }

  ngOnInit(): void {
  }

  archiveTask() {
    this.taskService.archive(this.IdDel).subscribe(
      () => {
      this.dialogClose.close(true);
      },
      (error) => {
        this.snackBarComponent.openSnackBar(`This taskId ${this.IdDel} is in project, You cant delete talk`, 'fail_snackbar')
        this.dialogClose.close(false);
      }
    );
  }

  unarchiveTask() {
    const apiDeArchive = {
      id: this.IdDel,
    }
    this.taskService.deArchive(apiDeArchive).subscribe(
      () => {
      this.dialogClose.close(true);
      },
      (error) => {
        this.snackBarComponent.openSnackBar(`This taskId ${this.IdDel} is in project, You cant delete talk`, 'fail_snackbar')
        this.dialogClose.close(false);
      });
  }

  deleteTask() {
    this.isSaving = true
    this.taskService.delete(this.IdDel).subscribe(
      () => {
      this.dialogClose.close(true);
      },
      (error) => {
        this.snackBarComponent.openSnackBar(`This taskId ${this.IdDel} is in project, You cant delete talk`, 'fail_snackbar')
        this.dialogClose.close(false);
      }
    )
  }

  toggleArchiveAndDel() {

    if (this.action === Confirm.archive) {
      this.archiveTask();

    } else if (this.action === Confirm.unarchive) {
      this.unarchiveTask();

    } else if (this.action === Confirm.delete) {
      this.deleteTask();
    }
  }
}
