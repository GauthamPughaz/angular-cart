import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/app-user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  currentUser: UserModel;

  constructor(private authService: AuthService) {
    authService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);
  }

  logout() {
    this.authService.logout();
  }

}
