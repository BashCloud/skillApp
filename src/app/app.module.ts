import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing/routing.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {SelectModule} from 'ng2-select';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './user/login/login.component';
import { MyskillComponent } from './skiils/myskill/myskill.component';
import { ListSkillsComponent } from './skills/list-skills/list-skills.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OthersInfoComponent } from './user/others-info/others-info.component';
import { HoverCardComponent } from './user/hover-card/hover-card.component';



@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    HeaderComponent,
    MyskillComponent,
    ListSkillsComponent,
    DashboardComponent,
    OthersInfoComponent,
    HoverCardComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CoreModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule, 
    SelectModule,
    SimpleNotificationsModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [ListSkillsComponent]
})
export class AppModule { }
