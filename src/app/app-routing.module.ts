import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ItemMasterComponent } from './item-master/item-master.component';

const routes: Routes = [
  {path: '', redirectTo:'login' , pathMatch: 'full'},
  {path: 'login', component: LoginComponent , pathMatch: 'full'},
  {path: 'productMaster', component: ItemMasterComponent , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
