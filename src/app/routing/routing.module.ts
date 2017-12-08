import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../core/auth.guard";
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { LoginComponent } from '../user/login/login.component';

const routes: Routes = [
  // { path: '', component: EmployeeComponent },
  // { path: 'search', component: SampleComponent },
  // { path: 'PLUS', component: NewNoticeComponent },
  // { path: 'emp', component: EmployeeComponent },
  { path: '', component: UserProfileComponent},
  // { path: 'about', component: UploadComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  // { path: 'new', component: AddNoticeComponent, canActivate: [AuthGuard]},
  // { path: 'notice/new', component: NewNoticeComponent, canActivate: [AuthGuard]},
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class RoutingModule { }
