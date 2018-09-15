import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { UserModel } from 'shared/models/app-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate() {
    return this.authService.currentUser$.pipe(
      map((userDetails: UserModel) => userDetails.isAdmin)
    );
  }

}
