import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidemenu',
  templateUrl: './dashboard-sidemenu.component.html',
  styleUrls: ['./dashboard-sidemenu.component.scss']
})
export class DashboardSidemenuComponent implements OnInit {

  roleName : any ;

  state: boolean = false;
  constructor(private router : Router) { }

  userRole : any;
  ngOnInit(): void {      
    let Storage = localStorage.getItem('UserObject');
    if(Storage){
      this.userRole = JSON.parse(Storage)
      this.roleName = JSON.parse(Storage).userName;
    }
  }

  logOut(){
    localStorage.removeItem('UserObject');
    this.router.navigateByUrl('/')
  }
}
