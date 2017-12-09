import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  action = "login";
  public loginForm = this.fb.group({
    name: [""],
    email: ["", Validators.required],
    password1: [""],
    password2: [""],
    TnC: false
  });
  constructor(public auth: AuthService,public fb: FormBuilder,
    private _notify: NotificationsService) { }

  login(){
    var formData = this.loginForm.value;
    console.log("__"+this.action+"...");
    if(this.action == "login")
      this.auth.emailLogin(formData.email,formData.password1);
    else if(this.action == "reset")
      this.auth.resetPassword(formData.email).then(function(){
        // this.sign_in_UI();
      });
    else if(this.action == "register"){   //Register Block
      if(formData.password1 != formData.password2){
        this._notify.warn(
          'Password mismach',
          'Please enter correct password !!',
        )
        return;
      }else if(formData.TnC == false){
        this._notify.warn(
          'Incomplete Form',
          'Kindly accept Terms and Conditions !!',
        )
        return;
      }else{
        this.auth.emailSignUp(formData.email,formData.password1,formData.name);
      }
    }   //register block closed
  }


  sign_up_UI() {
    var inputs = document.querySelectorAll('.input_form_sign');
    document.querySelectorAll('.ul_tabs > li')[0].className = "";
    document.querySelectorAll('.ul_tabs > li')[1].className = "active";
    for (var i = 0; i < inputs.length; i++) {
      if (i == 2) {
      } else {
        document.querySelectorAll('.input_form_sign')[i].className = "input_form_sign d_block";
      }
    }
    setTimeout(function () {
      for (var d = 0; d < inputs.length; d++) {
        document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block active_inp";
      }
    }, 100);
    document.querySelector('.btn_sign').innerHTML = "SIGN UP";
    this.action = "register";
    setTimeout(function () {
      document.querySelector('.link_forgot_pass_back').className = "link_forgot_pass_back d_none";      
      document.querySelector('.link_forgot_pass').className ="link_forgot_pass d_none";
      document.querySelector('.terms_and_cons').className="terms_and_cons d_block";
    }, 500);
    setTimeout(function () {
      document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_none";
      document.querySelector('.terms_and_cons').className = "terms_and_cons d_block";
    }, 450);
  }

  sign_in_UI() {
    var inputs = document.querySelectorAll('.input_form_sign');
    document.querySelectorAll('.ul_tabs > li')[0].className = "active";
    document.querySelectorAll('.ul_tabs > li')[1].className = "";
    for (var i = 0; i < inputs.length; i++) {
      if (i == 1) {
      } else {
        document.querySelectorAll('.input_form_sign')[i].className = "input_form_sign d_block";
      }
    }
    setTimeout(function () {
      for (var d = 0; d < inputs.length; d++) {
        switch (d) {
          case 1:
            break;
          case 2:
          default:
            document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block";
            document.querySelectorAll('.input_form_sign')[2].className = "input_form_sign d_block active_inp";
        }
      }           
    }, 100);
    setTimeout(function () {
      document.querySelector('.terms_and_cons').className = "terms_and_cons d_none";
      document.querySelector('.link_forgot_pass_back').className = "link_forgot_pass_back d_none";
      document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_block";
    }, 500);
    setTimeout(function () {
      for (var d = 0; d < inputs.length; d++) {
        switch (d) {
          case 1:
            break;
          case 2:
            break;
          default:
            document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign";
        }
      }
    }, 1500);
    document.querySelector('.btn_sign').innerHTML = "SIGN IN";
    this.action = "login";
  }
  reset_UI() {
    var inputs = document.querySelectorAll('.input_form_sign');
    setTimeout(function () {
      for (var d = 0; d < inputs.length; d++) {
        switch (d) {
          case 1: // skipping mail input
            break;
          default:
            document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block";
        }
      }     
    }, 100);
    setTimeout(function () {
      document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_none"; 
      document.querySelector('.link_forgot_pass_back').className = "link_forgot_pass_back d_block";      
    }, 500);
    setTimeout(function () {
      for (var d = 0; d < inputs.length; d++) {
        switch (d) {
          case 1: // skipping mail input
            break;
          default:
            document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign";
        }
      }
    }, 1500);
    document.querySelector('.btn_sign').innerHTML = "Reset Password";
    this.action = "reset";
  }
}
