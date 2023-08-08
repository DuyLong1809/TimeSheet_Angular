import { Component, OnInit } from '@angular/core';
import { ProjectService } from './handle/service/project.service';
import { CustomerProjects, ProjectInterfaceResult } from './handle/interface/project-interface';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Quantity } from 'src/app/shared/enum/quantity';
import { AppComponentBase } from 'src/app/shared/app-component-base';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent extends AppComponentBase implements OnInit {

  customerProjects: CustomerProjects[] = [];
  listProject: ProjectInterfaceResult[] = [];
  status = Quantity.Active;
  searchInput: string = '';
  private active: number = 0;
  private deactive: number = 0;
  private all!: number;

  options = [
    {
      value: Quantity.Active,
      label: "Active Projects",
      count: this.active
    },
    {
      value: Quantity.Deactive,
      label: "Deactive Projects",
      count: this.deactive
    },
    {
      value: Quantity.All,
      label: "All Projects",
      count: this.all
    }
  ]

  constructor(
    public dialog: MatDialog, 
    private projectService: ProjectService, 
    private router: Router) { 
    super()
  }

  ngOnInit(): void {
    this.getAllstatus();
    this.quantityProject();
  }

  openDialogProject() {
    this.router.navigate(['app/home/project/create']);
  }

  getAllstatus() {
    this.isLoading = true
    this.projectService.getAllStatus(this.status, this.searchInput).subscribe((data) => {
      this.listProject = data.result
      if (this.status === 0) {
        this.listProject = data.result.filter(item => item.status === 0)
      } else if (this.status === 1) {
        this.listProject = data.result.filter(item => item.status === 1)
      } else {
        this.listProject = data.result
      }

      this.customerProjects = [];

      this.listProject.forEach(project => {
        const customerIndex = this.customerProjects.findIndex(cp => cp.customerName === project.customerName);

        if (customerIndex !== -1) {
          this.customerProjects[customerIndex].projects.push(project);
        } else {
          this.customerProjects.push({
            customerName: project.customerName,
            projects: [project]
          });
        }
      });

      this.isLoading = false
    })
  }

  quantityProject() {
    this.projectService.getQuantityProject().subscribe((data) => {
      this.active = data.result[0]?.quantity ?? 0;
      this.deactive = data.result[1]?.quantity ?? 0;
      this.all = this.active + this.deactive;
      this.updateOptions();
    })
  }

  onStatusSelectionChange(value: any) {
    this.status = value;
    this.getAllstatus();
  }

  updateOptions() {
    this.options = [
      {
        value: Quantity.Active,
        label: "Active Projects",
        count: this.active
      },
      {
        value: Quantity.Deactive,
        label: "Deactive Projects",
        count: this.deactive
      },
      {
        value: Quantity.All,
        label: "All Projects",
        count: this.all
      }
    ]
  }
}
