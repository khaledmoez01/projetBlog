// auth guard service
import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService,
    public router: Router,
    private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    if (!this.cookieService.check('authToken')) {
      this.router.navigate(['/login']);
      return false;
    }
    
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token: string = this.cookieService.get('authToken');

    // decode the token to get its payload
    const tokenPayload = decode(token);

    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
