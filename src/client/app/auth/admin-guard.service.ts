import {Injectable}             from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}    from '@angular/router';
import {AuthService} from "../shared/services/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {
  }

  login: boolean = false;
  role: boolean = false;

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    this.isLoggedIn();
    this.checkRole();

    if (this.login && this.role) {
      return true;
    }

    this._router.navigate(['']);
    return false;
  }

  isLoggedIn() {
    this.login = this._authService.isLoggedIn();
  }

  checkRole() {
    this.role = this._authService.checkRole('Admin');
  }

}
