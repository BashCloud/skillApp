import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(public auth: AuthService) { }
  register(){
    console.log("Dude...");
    this.auth.googleLogin();
    // this.auth.emailSignUp("pulkit@tiedc.in","04101996");
  
  }
}