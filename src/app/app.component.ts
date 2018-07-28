import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.authService.user$.subscribe(
      user => {
        if (user) {
          this.userService.save(user);
          const returnURL = localStorage.getItem('returnUrl');
          if (returnURL) {
            localStorage.removeItem('returnUrl');
            this.router.navigate([returnURL]);
          }
        }
      }
    );
  }
}
