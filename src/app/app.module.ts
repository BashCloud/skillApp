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

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './user/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    HeaderComponent,
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
    SimpleNotificationsModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
