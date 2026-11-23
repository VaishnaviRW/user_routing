import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class userRolegaurd implements CanActivate {
  private _authservice = inject(AuthService);
  private _router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRoles: string[] = route.data['userRole'] || [];
    const loggedInRole = this._authservice.getuserRole();

    return loggedInRole && allowedRoles.includes(loggedInRole)
      ? true
      : this._router.createUrlTree(['/']);
  }
}
