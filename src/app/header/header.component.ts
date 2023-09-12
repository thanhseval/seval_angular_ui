import { Component } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) { }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

}
