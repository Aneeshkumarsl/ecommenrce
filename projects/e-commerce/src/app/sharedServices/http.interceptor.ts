import { Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable,of, throwError} from 'rxjs';
import { tap,catchError,finalize ,delay} from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { ToastService } from './toaster.services';
@Injectable()

export class customHttpInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService,private toast:ToastService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {        
      this.loaderService.ShowLoader();
      
      const tokenReq = req.clone(
        {
          headers:req.headers.set('Authorization', 'Bearer '+`${sessionStorage.getItem('token')}`)
                            .set('Content-Type','application/json')}

    )
                   
    return next.handle(tokenReq).pipe(
        delay(1000),
      finalize(()  => this.loaderService.HideLoader()),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `${error.message}`;
        }
        this.toast.show(errorMessage,{delay: 1000 });
        return throwError(errorMessage);
      })
      );

  }

}
