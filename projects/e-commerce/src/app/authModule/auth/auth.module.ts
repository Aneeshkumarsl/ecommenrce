import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeModuleModule } from '../../Home/home-module/home-module.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HomeModuleModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class AuthModule { }
