import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { LoginInterface } from '../interface/login-interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogFailedComponent } from '../../dialog-failed/dialog-failed.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService,  public dialog: MatDialog, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitLogin() {
    const credentials: LoginInterface = {
      userNameOrEmailAddress: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    
    this.loginService.authLogin(credentials).subscribe(
      (response) => {
        sessionStorage.setItem('token', response.result.accessToken); 
        this.router.navigate(['app/home/admin/task']);
    },
      (error) => {
        this.openDialog()
      }
    ); 
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogFailedComponent, {
      width: '500px',
    });
  }
}
