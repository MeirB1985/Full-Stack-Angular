import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import ItemModel from 'src/app/models/item.model';
import CartModel from 'src/app/models/cart.model';
import UserModel from 'src/app/models/user.model';
import ProductModel from 'src/app/models/product.model';
import { ItemsService } from 'src/app/services/items.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartsService } from 'src/app/services/carts.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})

export class ItemCardComponent implements OnChanges {

  @Input()
  public result: ItemModel[];
  
  @Input()
  public item: ItemModel;
  
  private carts: CartModel[];
  public products: ProductModel[];
  public product: ProductModel;
  public user: UserModel;
  public items: ItemModel[];
  private lastCartIndex: number;
  public imageUrl = environment.itemImagesUrl;
  public isCartPage: boolean;
  public highLight: boolean = false;

  constructor(
    private myActivatedRoute: ActivatedRoute,
    private myCartsService: CartsService,
    private myProductsService: ProductsService,
    private myItemsService: ItemsService
  ) { }

  async ngOnInit() {
    this.user = store.getState().authState.user;
    try {
      this.products = await this.myProductsService.getAllProducts();
    }
    catch (err) {
      console.log("err user products");
    }
    try {
      this.carts = await this.myCartsService.getAllCarts(this.user._id);
    }
    catch (err) {
      console.log("err getting user carts");
    }
    this.lastCartIndex = this.carts.length - 1;
    try {
      this.items = await this.myItemsService.getAllItems(this.carts[this.lastCartIndex]._id);
    }
    catch (err) {
      console.log("err getting user items");
    }
    if (this.myActivatedRoute.snapshot.routeConfig.path === "orders/new") {
      this.isCartPage = false;
    } else {
      this.isCartPage = true;
    }
    return this.isCartPage;
  }
  
  async deleteItem() {
    try {
      await this.myItemsService.deleteItem(this.item._id);
      await this.myItemsService.updateCart(true);
    }
    catch(err) {
      console.log(err);
    }
  }

  ngOnChanges(changes: SimpleChanges, item: ItemModel = this.item, eventListener: boolean = false) {
    item;
    changes.result;
    if (this.result !== undefined) {
      if (this.result === []) {
        eventListener = false;
      } else {
        for (let i of this.result) {
          if (i === this.item) {
            eventListener = true;
          }
        }
      }
      this.highLight = eventListener;
    }
  }
}