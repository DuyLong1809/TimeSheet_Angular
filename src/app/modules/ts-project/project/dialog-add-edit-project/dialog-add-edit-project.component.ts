import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../handle/service/project.service';
import { BranchInterface, CustomerClient, Itasks, Iusers, ListUserTeamInterface, NewProjectInterface, TaskInterface } from '../handle/interface/project-interface';
import { FormService } from '../handle/service/form.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-dialog-add-edit-project',
  templateUrl: './dialog-add-edit-project.component.html',
  styleUrls: ['./dialog-add-edit-project.component.scss']
})
export class DialogAddEditProjectComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private formService: FormService,
    private snackBarComponent: SnackBarComponent,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'))
    this.getAllClient();
    this.getAllBranch();
    this.getAllListUserTeam();
    this.isEditProjectForm();
    this.usersForm.clear();
    this.tasksForm.clear();
    this.createForm.reset(this.initialForm);

  }

  createForm = this.formService.createForm;
  usersForm = this.formService.createForm.get('users') as FormArray;
  tasksForm = this.formService.createForm.get('tasks') as FormArray;

  title: string = 'Create Project'
  listClients: CustomerClient[] = [];
  listBranchs: BranchInterface[] = [];
  listUserTeam: ListUserTeamInterface[] = [];
  private projectId!: number | null;
  private Iusers: Iusers[] = [];
  private Itasks: Itasks[] = [];
  private Alltask: TaskInterface[] = [];
  private branch: boolean = true;

  initialForm = {
    name: '',
    code: '',
    status: 0,
    timeStart: '',
    timeEnd: '',
    note: '',
    projectType: 0,
    customerId: 0,
    tasks: [],
    users: [],
    id: 0,
    komuChannelId: '',
    isNotifyToKomu: false,
    isAllUserBelongTo: true,
  };

  getAllClient() {
    this.projectService.getAllCustomerCLient().subscribe((data) => {
      this.listClients = data.result
    })
  }

  getAllBranch() {
    this.projectService.getAllBranch(this.branch).subscribe((data) => {
      this.listBranchs = data.result;
    })
  }

  getAllListUserTeam() {
    this.projectService.getAllListUserTeam().subscribe((data) => {
      this.listUserTeam = data.result;
    })
  }

  onSubmit() {
    if (this.usersForm.controls.length === 0) {
      this.dialog.open(DialogAlertComponent, {
        data: {
          title: 'Project must at least a member!',
          icon: 'cancel',
        },
      });
      return
    }
    if (!this.usersForm.controls.some(item => item.value.type === 1)) {
      this.dialog.open(DialogAlertComponent, {
        data: {
          title: 'Project must have a PM!',
          icon: 'cancel',
        },
      });
      return
    }
    this.projectService.save(this.createForm.value as NewProjectInterface).subscribe(() => {
      if (this.projectId) {
        this.snackBarComponent.openSnackBar('Update Project Successfully', 'success_snackbar')
      } else {
        this.snackBarComponent.openSnackBar('Create Project Successfully', 'success_snackbar')
      }
      this.router.navigate(['app/home/project']);
    });
  }

  isEditProjectForm() {
    if (this.projectId) {
      this.projectService.getEditProject(Number(this.projectId)).subscribe((data) => {
        this.title = 'Edit Project ' + `:${data.result.name}`;
        this.formService.createForm.patchValue(data.result);
        this.formService.setFormEditData(data.result);

        this.Iusers = data.result.users;
        this.Iusers.forEach((user) => {
          this.usersForm.push(
            this.fb.group({
              userId: user.userId,
              type: user.type,
            })
          );
        });

        this.Itasks = data.result.tasks;
        this.Itasks.forEach((task) => {
          this.tasksForm.push(
            this.fb.group({
              taskId: task.taskId,
              billable: task.billable,
            })
          );
        });
      })

    } else {
      this.projectService.getAllTask().subscribe((data) => {
        this.Alltask = data.result.filter((item) => item.type === 0)
        this.Alltask.map((task) => {
          this.tasksForm.push(
            this.fb.group({
              taskId: task.id,
              billable: true,
            })
          );
        })
      })
    }
  }

  cancelProject() {
    this.router.navigate(['app/home/project'])
  }
}
