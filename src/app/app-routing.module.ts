import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "admin/dashboard", component: AdminDashboardComponent },
  { path: "login", component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
