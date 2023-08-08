import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaveClient } from '../../../handle/interface/project-interface';
import { ProjectService } from '../../../handle/service/project.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  constructor(
    public dialogClose: MatDialogRef<NewClientComponent>,
    private snackBar: MatSnackBar, private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBarComponent: SnackBarComponent,
    ) { 
    this.newClientForm = this.fb.group({
      nameClient: ['', Validators.required],
      codeClient: ['', Validators.required],
      addressClient:[''],
    })
  }
  
  ngOnInit(): void {
  }

  newClientForm!: FormGroup;

  createClient(){
    const newClient: SaveClient = {
      name: this.newClientForm.value.nameClient,
      address: this.newClientForm.value.addressClient,
      code: this.newClientForm.value.codeClient,
    }

    this.projectService.saveClient(newClient).subscribe(()=>{
      this.dialogClose.close(true);
      this.snackBarComponent.openSnackBar('Create Client Successfully', 'success_snackbar')
    });
  }

}

