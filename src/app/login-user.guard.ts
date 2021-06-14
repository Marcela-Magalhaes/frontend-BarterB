import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserGuard implements CanActivate {

  constructor(private router: Router){

  }
  canActivate(){
    const recoveredData = localStorage.getItem('loggedUser');
    const parsedData = JSON.parse(recoveredData!);
    
    if(parsedData.token !== '' && parsedData.userId !== ''){
      return true;
    } else{
      this.router.navigate(['/home']);
      return false;
    }
  }
}
