import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'projects/e-commerce/src/app/sharedServices/apiService';
import { ToastService } from 'projects/e-commerce/src/app/sharedServices/toaster.services';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public viewMode: boolean = false;
  @Input() userData:any
  public useraddEditForm!: FormGroup;
  isReady: boolean = false;
  isHomeAddType: boolean = true;
  public addressType:string = "home"
  constructor(
    private apiService: ApiService,
    public toastService: ToastService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    // console.log(this.userData);
    if(this.userData.address){
      this.switchMode('view')
    }else{
      this.viewMode = true
    }
    
  }
  switchMode(mode: string) {
    if (mode === 'view') {
      if(!this.userData.address){
        this.userData['address'] = {
          contactName : '',
          contactNo : '',
          pincode : '',
          locality : '',
          city : '',
          state : '',
          landmark : '',
          addressType : 'home'
        }
      }
      this.addressType = this.userData['address'].addressType
      if(this.addressType === 'office'){
        this.isHomeAddType = false
      }
      this.useraddEditForm = this.formBuilder.group({
        // email: new FormControl(),
        // first_name: new FormControl(),
        // last_name: new FormControl(),
        // password: [ null, [Validators.required,Validators.minLength(5)]],

        contactName: [this.userData.address.contactName, [Validators.required]],
        contactNo: [this.userData.address.contactNo, [Validators.required]],
        pincode: [this.userData.address.pincode, [Validators.required]],
        locality: [this.userData.address.locality, [Validators.required]],
        city: [this.userData.address.city, [Validators.required]],
        state: [this.userData.address.state, [Validators.required]],
        landmark: [this.userData.address.landmark, [Validators.required]],
        // address: [ null, Validators.required]
      });
      this.viewMode = !this.viewMode;
      this.isReady = true
    }else if(mode === 'cancel'){
      if(this.userData.address && !this.userData.address.contactName){
        delete this.userData['address'] 
      } 
      this.viewMode = !this.viewMode;
    } else {
      this.editUserProfile();
    }
  }
  public onItemChange(value:any):void  {
    this.addressType = value;
  
  }
  
  editUserProfile() {
    if (this.useraddEditForm.invalid) {
      return;
    }
    console.log(this.addressType,"addressType");
    
    let updateData = {
      email : this.userData.email,
      address : {
        contactName : this.useraddEditForm.value.contactName,
        contactNo : this.useraddEditForm.value.contactNo,
        pincode : this.useraddEditForm.value.pincode,
        locality : this.useraddEditForm.value.locality,
        city : this.useraddEditForm.value.city,
        state : this.useraddEditForm.value.state,
        landmark : this.useraddEditForm.value.landmark,
        addressType : this.addressType
      }
    }
    this.apiService
      .post('/edit', 'user', updateData)
      .pipe(
        tap((res: any) => {
          if ((res.response.status = 'success')) {
            this.userData.address = updateData.address
            this.viewMode = true
            this.toastService.show('Your Address Updated Successfully', {
              delay: 100,
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
}
