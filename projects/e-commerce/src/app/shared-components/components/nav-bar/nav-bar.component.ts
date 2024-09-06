import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../sharedServices/auth.services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public userInfo: any = {};
  constructor( private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    
    this.auth.userObjData.subscribe((userObj) => (this.userInfo = userObj));
  }
}
