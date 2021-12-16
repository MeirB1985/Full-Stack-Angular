import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart.model';
import ItemModel from 'src/app/models/item.model';
import OrderModel from 'src/app/models/order.model';
import ProductModel from 'src/app/models/product.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { ItemsService } from 'src/app/services/items.service';
import { ProductsService } from 'src/app/services/products.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

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
  public searchValue: string;
  public result: ItemModel[];

  constructor(
    private myCartsService: CartsService,
    private myItemsService: ItemsService,
    private myProductsService: ProductsService,
    private notify: NotifyService
    ) { }

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
        this.notify.error("err getting user items");
      }
    }
    this.totalPrice = this.getTotalPrice();
  }
  
  getTotalPrice(): number {
       let total: number =0;
       for (let item of this.items) {
        total += item.price;
      }
      return total;
  }

  search(search1: string) {
    this.searchValue = search1;
    if (this.searchValue !== "") {
      this.result = this.items.filter(item=> item.products[0].name.toLowerCase().includes((this.searchValue).toLowerCase()));
    } else {
      this.result = [];
    }
  }
}
