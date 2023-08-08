import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../handle/service/project.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { Confirm } from 'src/app/shared/enum/confirm';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogClose: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private snackBarComponent: SnackBarComponent,
  ) {

    this.projectId = data.projectId
    this.action = data.action
    this.projectName = data.projectName

  }

  ngOnInit(): void {
  }

  private projectId: number
  action: number
  projectName: string
  
  active = Confirm.active;
  deActive = Confirm.deactive;
  delete = Confirm.delete;

  deleteProject() {
    this.projectService.delete(this.projectId).subscribe(() => {
      this.dialogClose.close(true);
      this.snackBarComponent.openSnackBar('Delete Project Successfully', 'success_snackbar')
    },
      (error) => {
        this.dialogClose.close(false);
        this.snackBarComponent.openSnackBar(`My Timesheet is exist, you can't delete Project`, 'fail_snackbar')
      }
    );
  }

  deactiveProject() {
    const data = {
      id: this.projectId
    }
    this.projectService.deactive(data).subscribe(() => {
      this.dialogClose.close(true);
      this.snackBarComponent.openSnackBar('Deactive Project Successfully', 'success_snackbar')
    });
  }

  activeProject() {
    const data = {
      id: this.projectId
    }
    this.projectService.active(data).subscribe(() => {
      this.dialogClose.close(true);
      this.snackBarComponent.openSnackBar('Active Project Successfully', 'success_snackbar')
    });
  }

  onclickProject() {
    if (this.action === Confirm.delete) {
      this.deleteProject();
    } else if (this.action === Confirm.deactive) {
      this.deactiveProject();
    } else if (this.action === Confirm.active) {
      this.activeProject();
    }
  }
}
