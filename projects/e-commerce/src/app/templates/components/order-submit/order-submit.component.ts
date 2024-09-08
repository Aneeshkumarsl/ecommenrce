import { Component, OnInit } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'projects/e-commerce/src/app/sharedServices/toaster.services';
import { ApiService } from 'projects/e-commerce/src/app/sharedServices/apiService';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';
import {
  UntypedFormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-submit',
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.scss'],
})
export class OrderSubmitComponent implements OnInit {
  public addressType: string = 'home';
  public billingAddress: string = 'default';
  isHomeAddType: boolean = true;
  cartDetails: Array<any> = [];
  orderDetails: Array<any> = [];
  userData: any = {};
  isReady: boolean = false;
  viewMode: boolean = false;
  public useraddEditForm!: UntypedFormGroup;
  totalAmount = 0;

  constructor(
    private apiService: ApiService,
    public toastService: ToastService,
    private sharedCartService: SharedCartService,
    private formBuilder: UntypedFormBuilder,
    private router:Router
  ) {
    this.sharedCartService.userCart.subscribe((userCart: any) => {
      if (userCart && userCart.length) {
        this.cartDetails = userCart;
        this.cartDetails.forEach((element: any) => {
          this.totalAmount = this.totalAmount + Number(element.details.offerPrice * element.quantity);
          this.orderDetails.push({
            id: element.id,
            name: element.name,
            quantity: element.quantity,
            price: element.details.offerPrice,
            images : element.details.images[0]
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();

    this.useraddEditForm = this.formBuilder.group({
      contactName: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      // address: [ null, Validators.required]
    });
  }

  public onItemChange(value: string, type: string): void {
    if (type === 'addressType') {
      this.addressType = value;
    } else {
      this.billingAddress = value;
    }
  }

  placeOrder() {
    let emailID = sessionStorage.getItem('email');
    if (!emailID) {
      this.toastService.show("Login to proceed checkout", { delay: 10000 });
      return;
    }
    // this.cartDetails.forEach((element: any) => {
    //   this.orderDetails.push({
    //     id: element.id,
    //     name: element.name,
    //     quantity: element.quantity,
    //     price: element.details.offerPrice,
    //   });
    // });
    let updateData = {
      emailID: emailID,
      productDetails: this.orderDetails,
      totalAmount : this.totalAmount,
      billingAddress : {}
    };
    if(this.billingAddress === "default"){
      updateData.billingAddress = this.userData.address
    }else{
      if(this.useraddEditForm.valid){
        updateData.billingAddress = {
          contactName : this.useraddEditForm.value.contactName,
          contactNo : this.useraddEditForm.value.contactNo,
          pincode : this.useraddEditForm.value.pincode,
          locality : this.useraddEditForm.value.locality,
          city : this.useraddEditForm.value.city,
          state : this.useraddEditForm.value.state,
          landmark : this.useraddEditForm.value.landmark,
          addressType : this.addressType
        }
      }else{
        this.toastService.show("Please fill all details in new address", { delay: 10000 });
        return
      }
    }
    console.log(updateData);

    this.apiService
      .post('/', 'order', updateData)
      .pipe(
        tap((res: any) => {
          if ((res.response.status = 'success')) {
            this.toastService.show('Your Order Placed Successfully', {
              delay: 1000,
            });
            this.router.navigate(['/home'])
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
    let emailID = sessionStorage.getItem('email');
    if (!emailID) {
      alert('Login to proceed checkout');
      return;
    }
    this.apiService
      .get('/', 'user', { email: emailID })
      .pipe(
        tap((res: any) => {
          if ((res.response.status = 'success')) {
            this.userData = res.response.data ? res.response.data.list[0] : {};
          }
          this.isReady = true;
          // if (this.userData.email) {

          // }
        }),
        catchError((error: any) => {
          this.toastService.show(error.errorMessages[0], { delay: 10000 });
          return of(error.errorMessages[0]);
        })
      )
      .subscribe();
  }
}
