import { Component, Input } from '@angular/core';
import store from 'src/app/redux/store';
import UserModel from 'src/app/models/user.model';
import CartModel from 'src/app/models/cart.model';
import OrderModel from 'src/app/models/order.model';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ItemsService } from 'src/app/services/items.service';
import ItemModel from 'src/app/models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  @Input()
  public totalPrice: number;

  public user: UserModel;
  public openCartDate: string;
  public lastOrderDate: string;
  public lastOrderIndex: number;
  public lastOrderDate2: string;
  public lastCartIndex: number;
  public orders: OrderModel[];
  public carts: CartModel[];
  public items: ItemModel[];
  public lastCartId: string;
  public lastOrderCartId: string;

  constructor(
    private myCartsService: CartsService,
    private myOrdersService: OrdersService,
    private myItemsService: ItemsService
    ) { }

  async ngOnInit() {
    this.user = store.getState().authState.user;
    if (this.user === null) {
      console.log("no user");
    } else if (this.user !== null && this.user.admin === true ) {
      console.log("admin");
    } else {
      try {
        this.carts = await this.myCartsService.getAllCarts(this.user._id);
      }
      catch (err) {
          console.log("no carts");
      }
      if (this.carts === null) {
      } else {
        this.lastCartIndex = this.carts.length-1;
        try {
          this.orders = await this.myOrdersService.getAllUserOrders(this.user._id);
        }
        catch (err) {
          console.log("problem getting order");
        }
        this.lastCartId = this.carts[this.lastCartIndex]._id;
        if (this.orders === null) {
          // we have a cart but no orders-means that this cart is open
          this.openCartDate = this.carts[this.lastCartIndex].date.toLocaleString();
        } else {
          // we have cart's and order's
          this.lastOrderIndex = this.orders.length-1;
          this.lastOrderCartId = this.orders[this.lastOrderIndex].cart.toString();
          // check if theirs an order on last cart
          if (this.lastCartId === this.lastOrderCartId) {
            // if id's are the same-means that this cart is closed-get last order date
            this.lastOrderDate = this.orders[this.lastOrderIndex].orderDate;
          } else {
            // when id's are different-means that there is an open cart
            this.openCartDate = this.carts[this.lastCartIndex].date.toLocaleString();
          }
        }
      }
      try {
        this.items = await this.myItemsService.getAllItems(this.carts[this.lastCartIndex]._id);
      }
      catch (err) {
        console.log("no items");
      }
      this.totalPrice = this.getTotalPrice();
    }
  }

  getTotalPrice(): number {
    let total: number =0;
    for (let item of this.items) {
      total += item.price;
    }
    return total;
  }
}
