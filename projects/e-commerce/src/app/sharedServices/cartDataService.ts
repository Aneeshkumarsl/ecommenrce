import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from 'projects/e-commerce/src/app/sharedServices/apiService';
import { ToastService } from './toaster.services';
import { AuthService } from 'projects/e-commerce/src/app/sharedServices/auth.services';
import { ModalComponent } from 'projects/e-commerce/src/app/shared-components/components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class SharedCartService {
  public userInfo: any = {};

  constructor(
    private apiService: ApiService,
    public toastService: ToastService,
    private modalService: NgbModal,
    private auth: AuthService
  ) {
    this.auth.userObjData.subscribe((userObj) => (this.userInfo = userObj));
  }

  emptyCart = [];

  value: Array<any> = [];
  cart: any = {
    emailID: '',
    cartID: '',
    productDetails: [],
  };
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject({
    // anee:"0"
  });

  private userCartDetails = new BehaviorSubject({});
  userCart = this.userCartDetails.asObservable();

  currentMessage = this.messageSource.asObservable();
  changeMessage(message: any) {
    this.value.push(message);
    console.log(this.value, 'message');
    this.messageSource.next(this.value);
  }

  loadUserCart() {
    let email = sessionStorage.getItem('email') || '';
    if (email) {
      this.apiService.get('/' + email, 'cart', '').subscribe((res: any) => {
        if (res.response.status == 'success') {
          this.cart = {
            emailID: '',
            cartID: 'dummy',
            productDetails: [],
          };
          this.cart.emailID = email;
          this.cart.cartID = res.response.data._id;
          this.userCartDetails.next(res.response.data.productDetails);
                    if( res.response.data.productDetails)
       res.response.data.productDetails.forEach((element: any) => {
            this.cart.productDetails.push({
              id: element.id,
              name: element.name,
              quantity: element.quantity,
            });
          });
          this.toastService.show('Cart Refreshed successfully');
        }
      });
    } else {
      this.userCartDetails.next(this.emptyCart);
    }
  }

  updateUserCart(cart: any) {
    if (this.userInfo.isLoggedIn) {
      if (cart) {
        const index = this.cart.productDetails.findIndex(
          (product: any) => product.id === cart._id
        );

        if (index !== -1) {
          this.cart.productDetails[index].quantity =
            this.cart.productDetails[index].quantity + (cart.quantity || 1);
        } else {
          this.cart.productDetails.push({
            id: cart._id,
            name: cart.name,
            quantity: cart.quantity || 1,
          });
        }
      }
      
      let id = this.cart.cartID;
      delete this.cart.cartID;
      this.apiService.put('/' + id, 'cart', this.cart).subscribe((res: any) => {
        if (res.response.status == 'success') {
          this.loadUserCart();
          // this.cart.productDetails = []

          // this.userCartDetails.next(res.response.data.productDetails);
          // res.response.data.productDetails.forEach((element:any) => {
          //   this.cart.productDetails.push({
          //     id : element.id,
          //     name : element.name,
          //     quantity : element.quantity
          //   })
          // });
        }
      });
    } else {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.value = 'Do you Want to Login!';
    }
  }
  clearFromCart(id: string) {
    const index = this.cart.productDetails.findIndex(
      (product: any) => product.id === id
    );
    this.cart.productDetails.splice(index, 1);
    this.updateUserCart('');
  }
}
