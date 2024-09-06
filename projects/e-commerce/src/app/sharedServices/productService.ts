
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './apiService';

@Injectable({
  providedIn: 'root'
})
export class productService {

  constructor(
    private apiService:ApiService,
   ) { }


public getproductDetails(val:any):Observable<any>{
    
    return this.apiService.get("/","products",val)
}

}
