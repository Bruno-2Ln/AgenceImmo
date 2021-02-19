import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { SinglePropertyComponent } from './components/single-property/single-property.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "admin/dashboard", canActivate: [AuthGuardService], component: AdminDashboardComponent },
  { path: "login", component: SigninComponent},
  { path: 'property/:id', component: SinglePropertyComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
