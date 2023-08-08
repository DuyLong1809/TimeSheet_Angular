import { Component, Input, OnInit } from '@angular/core';
import { ProType } from 'src/app/shared/enum/pro-type';
import { NewClientComponent } from './new-client/new-client.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerClient } from '../../handle/interface/project-interface';
import { DialogAddEditProjectComponent } from '../dialog-add-edit-project.component';
import { FormService } from '../../handle/service/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private componentAdd: DialogAddEditProjectComponent,
    private route: ActivatedRoute,
    private formService: FormService,) { 
      
    }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditProject();
  }

  @Input() listClients!: CustomerClient[];

  private projectId: number | null | undefined;
  selectedType: number | null | undefined;
  createForm = this.formService.createForm;

  types = [
    ProType.FF,
    ProType.NB,
    ProType.ODC,
    ProType.PRODUCT,
    ProType.TM,
    ProType.TRAINING
  ]

  isEditProject() {
    if (this.projectId)
      this.formService.editData.subscribe((data) => {
        this.selectedType = data?.projectType;
      })
  }

  openNewClient() {
    const dialogRef = this.dialog.open(NewClientComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((rs) => {
      if (rs) {
        this.componentAdd.getAllClient();
      }
    });
  }

  onRadioChange(event: number) {
    this.selectedType = event;
    this.createForm.get('projectType')?.setValue(this.selectedType);
  }
} 
