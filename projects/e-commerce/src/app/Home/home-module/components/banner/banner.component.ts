import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'projects/e-commerce/src/app/sharedServices/apiService';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  public banerItems:Array<any> = [];

  constructor(private router: Router,private apiSevice:ApiService) { }

  ngOnInit(): void {
    this.apiSevice.get("/","sections","").subscribe((res:any)=>
    {      
      if(res.response.status == "success"){        
        this.banerItems = res.response.data;
      }
    }
    )

  }
  public productDetailedView():void {

    this.router.navigate(['product/list']);
  }
}
