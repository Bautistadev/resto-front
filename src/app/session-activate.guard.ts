import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SessionActivateGuard implements CanActivate {



async canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): Promise<boolean | UrlTree>{
    try {

      //SI LA SESSION ESTA GUARDADA, Y VALIDADA, NOS QUEDAMOS DONDE ESTAMOS
      var sessionToken = sessionStorage.getItem('sessionToken')
      const response: AxiosResponse = await axios.post('http://localhost:8080/security/validateToken',sessionToken); // Cambia la URL por la correcta
      return true
    } catch (error) {

      //DE LO CONTRARIO NOS EXPULSA DE LA SESSION
      this.navControl.navigateRoot('login')
      return false
    }
  }

  constructor(public navControl:NavController) {}

}
