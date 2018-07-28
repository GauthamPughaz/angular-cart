import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/app-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate() {
    return this.authService.currentUser$.pipe(
      map((userDetails: UserModel) => userDetails.isAdmin)
    );
  }

}
