import { LoginService } from './../services/login.service';
import { NavController } from '@ionic/angular';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if (!this.loginService.token) {
      this.navCtrl.navigateRoot('/login');
    } 
      return true;
  }
}
