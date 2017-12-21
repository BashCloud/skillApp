import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../core/auth.guard";
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { LoginComponent } from '../user/login/login.component';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { OthersInfoComponent } from '../user/others-info/others-info.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'user/:id', component: OthersInfoComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class RoutingModule { }
