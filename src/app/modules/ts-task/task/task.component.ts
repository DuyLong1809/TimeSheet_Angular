import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEditComponent } from './dialog-add-edit/dialog-add-edit.component';
import { TaskService } from './service/task.service';
import { TaskInterface } from './interface/task-interface';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private taskService: TaskService,
    ) { }

  ngOnInit(): void {
    this.getAllTask();
  }

  searchTerm: string = ""
  lengthCommontask!: number;
  lengthOthertask!: number;
  commontasks: any[] = [];
  othertasks: any[] = [];
  private listTasks: TaskInterface[] = [];

  openDialogAdd(isEdit: boolean, type: number) {
    const dialogRef = this.dialog.open(DialogAddEditComponent, {
      data: {
        isEdit: isEdit,
        isType: type,
      }
    });

    dialogRef.afterClosed().subscribe((rs) => {
      if (rs) {
        this.getAllTask();
      }
    });
  }

  refreshTask() {
    this.getAllTask();
  }

  getAllTask() {
    this.taskService.getAllTask().subscribe((data) => {
      this.listTasks = data.result;
      this.filterTaskByType();
    });
  }

  filterTaskByType() {
    this.commontasks = this.listTasks.filter(item => item.type === 0);
    this.othertasks = this.listTasks.filter(item => item.type === 1);
    this.countTask();
  }

  countTask() {
    this.lengthCommontask = this.commontasks.length;
    this.lengthOthertask = this.othertasks.length;
  }

  search() {
    const searchTerm = this.searchTerm.toLowerCase();

    this.commontasks = this.listTasks.filter(task => task.name.toLowerCase().trim().includes(searchTerm.trim()) && task.type === 0);
    this.othertasks = this.listTasks.filter(task => task.name.toLowerCase().includes(searchTerm) && task.type === 1);

    this.countTask()
  }
}
