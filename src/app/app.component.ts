import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rlc';
  log: boolean = false;
  constructor(private login: LoginService){}
  ngOnInit() {
    this.login.log.subscribe(
      data => this.log = data
    );
  }
}
