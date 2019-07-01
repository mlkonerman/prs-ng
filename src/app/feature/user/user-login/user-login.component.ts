import { Component, OnInit } from '@angular/core';
import { User } from '@model/user.class';
import { JsonResponse } from '@model/json-response.class';
import { UserService } from '@svc/user.service';
import { SystemService } from '@svc/system.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  message: string = "";
  user: User = new User();
  jr: JsonResponse;

  constructor(private userSvc: UserService,
    private sysSvc: SystemService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userSvc.login(this.user)   //calls the login method in the service
      .subscribe(jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.user = this.jr.data as User;
          this.sysSvc.data.user.instance = this.user;
          this.sysSvc.data.user.loggedIn = true;
          this.router.navigateByUrl('/home');
        }
        else {
        this.message = "Invalid Username/Password combo. Please try again.";
        }
      })
  }

}
