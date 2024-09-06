import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderService } from './sharedServices/loader.service';
import { customHttpInterceptor } from './sharedServices/http.interceptor';
import { LayoutComponentComponent } from './common/layout-component/layout-component.component';
import { RouterModule } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LayoutComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    SharedComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule
    ],
    providers: [LoaderService,
      {provide: HTTP_INTERCEPTORS,useClass:customHttpInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
