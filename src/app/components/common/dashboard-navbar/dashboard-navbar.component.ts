import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtility } from 'src/app/interceptor/appUtitlity';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  userProfile : any;
  constructor(private _utility : AppUtility , private router : Router) { }

  ngOnInit(): void {
    let userData  = this._utility.getLocalStorageDetails();
    this.userProfile = userData;
  }

  logout(){
    localStorage.removeItem('UserObject');
    this.router.navigateByUrl('/login');
  }

}
