import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import CartModel from 'src/app/models/cart.model';
import ItemModel from 'src/app/models/item.model';
import OrderModel from 'src/app/models/order.model';
import ProductModel from 'src/app/models/product.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { ItemsService } from 'src/app/services/items.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  public totalPrice: number =0;
  public user: UserModel;
  public items: ItemModel[];
  public item: ItemModel;
  public products: ProductModel[];
  public product: ProductModel;
  public imageUrl = environment.productImagesUrl;
  private carts: CartModel[];
  public cart: CartModel;
  private lastCartIndex: number;
  public order: OrderModel;
  public sum = 0;
  public isCartEmpty: boolean;

  private productSubscription: Subscription;
  private itemSubscription: Subscription;
  public isCartUpdated: boolean;
  public isItemDeleted: boolean;


  constructor(
    private myCartsService: CartsService,
    private myItemsService: ItemsService,
    private myProductsService: ProductsService,
    private myRouter: Router
    ) { 
      this.isItemDeleted = false;
      this.itemSubscription = this.myItemsService.getCartObservable().subscribe(async update => {
        if (update) {
          try {
            this.items = await this.myItemsService.getAllItems(this.carts[this.lastCartIndex]._id);
          }
          catch (err) {
            console.log("err getting user items");
          }
        }
      });
      this.isCartUpdated = false;
      this.productSubscription = this.myProductsService.getCartObservable().subscribe(async update => {
        if (update) {
          try {
            this.items = await this.myItemsService.getAllItems(this.carts[this.lastCartIndex]._id);
            this.isCartEmpty = false;
          }
          catch (err) {
            console.log("err getting user items");
          }
        }
      });
    }

  async ngOnInit() {
    this.user = store.getState().authState.user;
    try {
      this.products = await this.myProductsService.getAllProducts();
    }
    catch (err) {
      console.log("err user products-check if neccessery");
    }
    try {
      this.carts = await this.myCartsService.getAllCarts(this.user._id);
    }
    catch (err) {
      console.log("err getting user carts");
    }
    if (this.carts === undefined) {
      console.log("no carts");
    } else {
      this.lastCartIndex = this.carts.length - 1;
      try {
        this.items = await this.myItemsService.getAllItems(this.carts[this.lastCartIndex]._id);
      }
      catch (err) {
        console.log("err getting user items");
      }
    }
    this.totalPrice = this.getTotalPrice();

    if (this.items.length >= 1) {
      this.isCartEmpty = false;
    } else {
      this.isCartEmpty = true;
    }
  }

  getTotalPrice(): number {
    let total: number = 0;
    for (let item of this.items) {
      total += item.price;
    }
    return total;
  }

  async deleteAll() {
    try {
      await this.myItemsService.deleteAll();
      console.log("items has been deleted");
      this.items = [];
      this.isCartEmpty = true;
    }
    catch(err) {
        console.log(err);
    }
  }

  public isEmpty() {
    return this.isCartEmpty;
  }

  makeOrder() {
    this.myRouter.navigateByUrl("/orders/new");
  }
}
