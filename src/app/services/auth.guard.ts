import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root',
})


export class AuthGuard implements CanActivate {


    constructor(
        private authService: AuthServiceService,
        private router: Router,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.authState$.pipe(map(state => {
            if (state !== null) { return true; }

            this.router.navigate(['/login']);
            return false;
        }
        )
        );
    }
}
