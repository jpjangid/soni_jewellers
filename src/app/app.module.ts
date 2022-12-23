import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemMasterComponent } from './item-master/item-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardMyProfileComponent } from './dashboard/dashboard-my-profile/dashboard-my-profile.component';
import { CopyrightsComponent } from './dashboard/copyrights/copyrights.component';
import { DashboardNavbarComponent } from './dashboard/dashboard-navbar/dashboard-navbar.component';
import { DashboardSidemenuComponent } from './dashboard/dashboard-sidemenu/dashboard-sidemenu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ItemMasterComponent,
    DashboardComponent,
    DashboardMyProfileComponent,
    CopyrightsComponent,
    DashboardNavbarComponent,
    DashboardSidemenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
