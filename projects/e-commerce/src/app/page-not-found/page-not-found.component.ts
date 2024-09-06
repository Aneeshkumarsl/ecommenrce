import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public router: Router,private location:Location) { }

  ngOnInit(): void {
  }
  public goHome(): void {
    this.router.navigate(['/']);
  };
  backClicked() {
    this.location.back();
  };
}
