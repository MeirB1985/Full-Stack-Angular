import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import UserModel from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import CartModel from 'src/app/models/cart.model';
import OrderModel from 'src/app/models/order.model';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();
    public user: UserModel;
    private unsubscribeMe: Unsubscribe;
    public lastOrderIndex: number;
    private lastCartIndex: number;
    public orders: OrderModel[];
    public carts: CartModel[];
    public newCart: CartModel;
    public cart: CartModel;
    public lastCartId: string;
    public lastOrderCartId: string;

    constructor(
        private myAuthService: AuthService,
        private myCartsService: CartsService,
        private myOrdersService: OrdersService,
        private notify: NotifyService,
        private myRouter: Router
        ) { }

    async ngOnInit() {
        this.unsubscribeMe = store.subscribe(async () => {
            this.user = store.getState().authState.user;
            if (this.user === null) {
                console.log("no user");
            } else if (this.user.admin === true ) {
                console.log("admin");
            } else {
                try {
                    this.carts = await this.myCartsService.getAllCarts(this.user._id);
                }
                catch (err) {
                    console.log("err getting carts");
                }
                if (this.carts === null) {
                    console.log("no carts");
                } else {
                    try {
                        this.orders = await this.myOrdersService.getAllUserOrders(this.user._id);
                    }
                    catch (err) {
                        console.log("err getting orders");
                    }
                    this.lastCartIndex = this.carts.length-1;
                    this.lastCartId = this.carts[this.lastCartIndex]._id;
                    if (this.orders === null) {
                        console.log("no orders");
                    } else {
                        this.lastOrderIndex = this.orders.length-1;
                        this.lastOrderCartId = this.orders[this.lastOrderIndex].cart.toString();
                    }
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

    async createNewCart() {
        this.user = store.getState().authState.user;
        this.newCart = new CartModel();
        this.newCart.user = this.user;
        this.newCart.date = new Date().toDateString();
        try {
            this.newCart = await this.myCartsService.addCart(this.newCart);
        }
        catch (err) {
        console.log("problem creating cart");
        }
        this.myRouter.navigateByUrl("/products");
    }

    public async login() {
        try {
            await this.myAuthService.login(this.credentials);
            if (this.user.admin===true) {
                this.notify.success("Welcome admin");
                this.myRouter.navigateByUrl("/admin");
            } else {
                this.notify.success("You are logged-in, enjoy your shopping");
                this.myRouter.navigateByUrl("/products");
            }
        }
        catch(err) {
            console.log(err);
        }
    }
}
