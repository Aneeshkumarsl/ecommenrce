import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ApiService } from 'projects/e-commerce/src/app/sharedServices/apiService';
import { AuthService } from 'projects/e-commerce/src/app/sharedServices/auth.services';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';
import { ToastService } from 'projects/e-commerce/src/app/sharedServices/toaster.services';
import { Location } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  containerClass: string = 'container my-3';
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public submitted: boolean = false;
  public loginSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private auth: AuthService,
    public toastService: ToastService,
    public cartService: SharedCartService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let token = sessionStorage.getItem('token');
    if (token) {
      this.toastService.show('Already LoggedIn, Please Proceed', {
        delay: 1000,
      });
      this.location.back();
    }
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      first_name: [null, [Validators.required, Validators.minLength(3)]],
      last_name: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.maxLength(10)]],
    });

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }
  get registerFormControls() {
    return this.registerForm.controls;
  }

  public register(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.valid) {
      this.service
        .post('/register', 'user', this.registerForm.value)
        .pipe(
          tap((res: any) => {
            if ((res.response.status = 'success')) {
              this.toastService.show('Successfully Registered, Please login', {
                delay: 1000,
              });
              this.containerClass = 'container my-3';
            }
          }),
          catchError((error: any) => {
            this.toastService.show(error.errorMessages[0], { delay: 10000 });
            return of(error.errorMessages[0]);
          })
        )
        .subscribe();
    }
  }

  public login(): void {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      this.loginForm.value.module = 'customer';
      this.service
        .post('/', 'Auth', this.loginForm.value)
        .pipe(
          tap((res: any) => {
            if ((res.response.status = 'success')) {
              sessionStorage.setItem('email', res.response.data.email);
              sessionStorage.setItem('token', res.response.data.token);
              sessionStorage.setItem('name', res.response.data.name);
              sessionStorage.setItem('isLoggedIn', 'true');
              this.auth.setUserObject({
                isLoggedIn: true,
                name: res.response.data.name,
                email: res.response.data.email,
              });
              this.cartService.loadUserCart()
              this.toastService.show('Successfully LoggedIn', { delay: 1000 });
              this.location.back();
            }
          }),
          catchError((error: any) => {
            this.toastService.show(error.errorMessages[0], { delay: 10000 });
            return of(error.errorMessages[0]);
          })
        )
        .subscribe();
    }
  }

  signIn() {
    this.containerClass = 'container my-3';
  }
  signUp() {
    this.containerClass = 'container my-3 right-panel-active';
  }
}
