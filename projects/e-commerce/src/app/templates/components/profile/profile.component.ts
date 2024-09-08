import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/e-commerce/src/app/sharedServices/apiService';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'projects/e-commerce/src/app/sharedServices/toaster.services';
import {
  UntypedFormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public viewMode: boolean = true;
  userData: any = {};
  imgURL: any = '../../../../../assets/user.png';
  public userEditForm!: UntypedFormGroup;
  isReady: boolean = false;
  checkoutForm = this.formBuilder.group({
    name: 'asdasd',
    address: 'asdasd',
  });

  constructor(
    private apiService: ApiService,
    public toastService: ToastService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  switchMode(mode: string) {
    if (mode === 'view' || mode === 'cancel') {
      this.viewMode = !this.viewMode;
    } else {
      this.editUserProfile();
    }
  }

  loadForm(user: any) {
    this.userEditForm = this.formBuilder.group({
      // email: new FormControl(),
      // first_name: new FormControl(),
      // last_name: new FormControl(),
      // password: [ null, [Validators.required,Validators.minLength(5)]],
      email: [{ value: user.email, disabled: true }, [Validators.required]],
      first_name: [
        user.first_name,
        [Validators.required, Validators.minLength(3)],
      ],
      last_name: [user.last_name, [Validators.required]],
      phone: [user.phone, [Validators.required]],
      // address: [ null, Validators.required]
    });
    this.isReady = true;
  }

  editUserProfile() {
    if (this.userEditForm.invalid) {
      return;
    }
    let updateData = {
      email : this.userData.email,
      first_name : this.userEditForm.value.first_name,
      last_name : this.userEditForm.value.last_name,
      phone : this.userEditForm.value.phone,
    }
    this.apiService
      .post('/edit', 'user', updateData)
      .pipe(
        tap((res: any) => {
          if ((res.response.status = 'success')) {
            this.loadUserProfile()
            this.toastService.show('Your Profile Updated Successfully', {
              delay: 1000,
            });
          }
        }),
        catchError((error: any) => {
          this.toastService.show(error.errorMessages[0], { delay: 10000 });
          return of(error.errorMessages[0]);
        })
      )
      .subscribe();
  }

  loadUserProfile() {
    
    this.apiService
      .get('/', 'user', { email: 'smartmasks@gmail.com' })
      .pipe(
        tap((res: any) => {
          if ((res.response.status = 'success')) {
            console.log(res);
            
            this.userData = res.response.data ? res.response.data.list[0] : {};
          }
          if (this.userData.email) {
            this.loadForm(this.userData);
          }
          this.viewMode = true
        }),
        catchError((error: any) => {
          this.toastService.show(error.errorMessages[0], { delay: 10000 });
          return of(error.errorMessages[0]);
        })
      )
      .subscribe();
  }
}
