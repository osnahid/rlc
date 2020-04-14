import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, FormControlDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  log: boolean = false;
  password: string = "";
  username: string = "";
  constructor(private login: LoginService) { }
  loginForm = new FormGroup(
    {
      username : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    }
  );
  ngOnInit() {
    
  }

  onSubmit(){ 
    if(this.loginForm.get('password').value === "123"&& this.loginForm.get('username').value === "admin"){
      this.login.loggedIn();
    }
    else{

    }
  }
}
