import { Component, Input, OnInit } from '@angular/core';
import { CustomerProjects, ProjectInterfaceResult } from '../handle/interface/project-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ProjectComponent } from '../project.component';
import { Confirm } from 'src/app/shared/enum/confirm';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {

  constructor(private router: Router,
    public dialog: MatDialog,
    private projectComponent: ProjectComponent,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  @Input() listProject!: ProjectInterfaceResult[];
  @Input() customerProjects!: CustomerProjects[];

  active = Confirm.active;
  deActive = Confirm.deactive;
  delete = Confirm.delete;

  openEditProject(id: number) {
    this.router.navigate([`app/home/project/edit/${id}`]);
  }

  openViewProject(timeStart: string, timeEnd: string, id: number) {
    const dialogRef = this.dialog.open(ViewComponent, {
      data: {
        startDate: timeStart,
        endDate: timeEnd,
        projectId: id
      }
    });
    // dialogRef.afterClosed().subscribe(() => {

    // });
  }

  openDialogConfirm(id: number, action: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        projectId: id,
        action: action,
        projectName: name,
      }
    });

    dialogRef.afterClosed().subscribe((rs) => {
      if (rs) {
        this.projectComponent.getAllstatus();
        this.projectComponent.quantityProject();
      }
    });
  }
}
