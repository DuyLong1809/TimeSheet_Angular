import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  popup : boolean = false;
  popupMenuAdmin : boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  showPopupLogout() {
    this.popup = true;
  }

  logOut(){
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }

  onClickMenuAdmin() {
    this.popupMenuAdmin = !this.popupMenuAdmin;
  }
}
