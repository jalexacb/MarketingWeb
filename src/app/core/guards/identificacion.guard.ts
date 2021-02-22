import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
// import { CanActivate } from '@angular/router';
// import { LoginService } from '../login/login.service';

@Injectable()
export class IdenficicacionAuthGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        let identificacion = this.loginService.getUsuarioIdentificado();
        if (!identificacion) {
            console.log('No estás logueado');
            this.router.navigate(['/auth/signin']);
            return false;
        }

        return true;
    }
}