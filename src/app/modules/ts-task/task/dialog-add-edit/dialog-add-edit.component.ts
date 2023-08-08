import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskInterface } from '../interface/task-interface';
import { TaskService } from '../service/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TaskComponent } from '../task.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { AppComponentBase } from 'src/app/shared/app-component-base';


@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.scss']
})
export class DialogAddEditComponent extends AppComponentBase implements OnInit {

  taskForm: FormGroup
  isEdit: boolean
  isType: number
  isName: string
  private isId: number

  constructor(
    private snackBar: MatSnackBar,
    public dialogClose: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBarComponent: SnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super()
    this.taskForm = this.fb.group({
      nameTask: ['', Validators.required],
    })
    this.isEdit = data.isEdit
    this.isName = data.isName
    this.isType = data.isType
    this.isId = data.isId
  }

  ngOnInit(): void {
  }

  onTypeSelectionChange(event: any) {
    this.isType = event.value
  }

  createTask() {
    this.isSaving = true
    const newTask: TaskInterface = {
      name: this.taskForm.value.nameTask,
      type: this.isType,
    };
    this.taskService.saveTask(newTask).subscribe(
      () => {
        this.isSaving = false
        this.snackBarComponent.openSnackBar(`Create Task: ${this.taskForm.value.nameTask}`, 'success_snackbar')
        this.dialogClose.close(true);
      },
      (error) => {
        this.snackBarComponent.openSnackBar(`Task ${this.taskForm.value.nameTask} already exist`, 'fail_snackbar');
        this.dialogClose.close(false);
      });
  }

  updateTask() {
    const updateTask: TaskInterface = {
      id: this.isId,
      name: this.taskForm.value.nameTask,
      type: this.isType,
    };

    this.taskService.saveTask(updateTask).subscribe(
      () => {
        this.isSaving = false
        this.snackBarComponent.openSnackBar(`Edit Task: ${this.taskForm.value.nameTask}`, 'success_snackbar')
        this.dialogClose.close(true);
      },
      (error) => {
        this.snackBarComponent.openSnackBar(`Task ${this.taskForm.value.nameTask} already exist`, 'fail_snackbar');
        this.dialogClose.close(false);
      });
  }

  onSubmitTask() {
    if (this.isEdit) {
      this.updateTask();
    } else if (this.isEdit === false) {
      this.createTask();
    }
  }
}
