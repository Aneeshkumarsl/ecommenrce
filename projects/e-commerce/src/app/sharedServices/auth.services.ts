import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable,BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  private userObj = new BehaviorSubject({
    name : sessionStorage.getItem('name'),
    email : sessionStorage.getItem('email'),
    isLoggedIn:sessionStorage.getItem('isLoggedIn'),
  });
  userObjData = this.userObj.asObservable();


  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']);

  }

  setUserObject(obj:any){
    this.userObj.next(obj)
  }
}