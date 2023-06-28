import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SessionNotActivateGuard implements CanActivate {

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree>{
      try {
        //SI LA SESSION EXISTE Y ESTA VALIDADA, NSO EXPULSA DEL LOGIN Y NOS DIRIGE A LA SESSION
        var sessionToken = sessionStorage.getItem('sessionToken')
        const response: AxiosResponse = await axios.post('http://localhost:8080/security/validateToken',sessionToken); // Cambia la URL por la correcta
        this.navControl.navigateRoot('inicio')
        return false
      } catch (error) {

        //EN CASO CONTRARIOS NOS QUEDAMOS EN EL LOGIN
        return true
      }
    }

    constructor(public navControl:NavController) {}


}
