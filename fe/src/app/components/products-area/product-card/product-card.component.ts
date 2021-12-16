import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart.model';
import CategoryModel from 'src/app/models/category.model';
import ItemModel from 'src/app/models/item.model';
import OrderModel from 'src/app/models/order.model';
import ProductModel from 'src/app/models/product.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../dialog/dialog.component';

export interface DialogData {
  product: ProductModel;
  quantity: number;
}

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {

  @Input()
  public product: ProductModel;

  @Input()
  public category: CategoryModel;

  public user: UserModel;
  public products: ProductModel[];
  public item = new ItemModel();
  public items: ItemModel[];
  public orders: OrderModel[];
  public imageUrl = environment.productImagesUrl;
  private carts: CartModel[];
  private newCart: CartModel;
  public categories: CategoryModel[];
  private lastCartIndex: number;
  private lastOrderIndex: number;
  public quantity: number;

  constructor (
    private myCartsService: CartsService,
    private myOrdersService: OrdersService,
    private myItemsService: ItemsService,
    private myProductsService: ProductsService,
    private myActivatedRoute: ActivatedRoute,
    private myCategoriesService: CategoryService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    try {
      const id = this.myActivatedRoute.snapshot.params.id;
      this.category = await this.myCategoriesService.getOneCategory(id);
      }
    catch (err) {
      console.log(err);
    }
    try {
      this.categories = await this.myCategoriesService.getAllCategories();
    }
    catch (err) {
      console.log(err);
    }
  }

  async openDialog() {
    this.user = store.getState().authState.user;
    if (this.user.admin === true) {
    } else {
      try {
        this.carts = await this.myCartsService.getAllCarts(this.user._id);
      }
      catch (err) {
        console.log("err getting user carts");
      }
      console.log('The dialog was closed');
      
      let dialogRef = this.dialog.open(DialogComponent, {
        data: {quantity: this.quantity, product: this.product},
      });

      dialogRef.afterClosed().subscribe( async result => {
        this.quantity = result;
        // find out if user have an open cart or not
        if (this.carts === undefined || this.carts === null){
          console.log("carts null");
          // there is no cart for this user-create one
          this.createCartAndAddItem();
        } else {
          try {
            this.orders = await this.myOrdersService.getAllUserOrders(this.user._id);
          }
          catch (err) {
            console.log("err getting user orders");
          }
          // find out if user have some old order
          if (this.orders === undefined || this.orders === null) {
            // there is an open cart for this user, but no orders in it-add items to it
            this.addItemToOpenCart();
          } else {
            // this user have cart and order, check if he has an open cart or not
            this.lastCartIndex = this.carts.length - 1;
            this.lastOrderIndex = this.orders.length - 1;
            if (this.carts[this.lastCartIndex]._id === this.orders[this.lastOrderIndex].cart._id) {
              // the user closed his last cart-create new one for him
              this.createCartAndAddItem(); 
            } else {
              console.log("there is an open cart")
              this.lastCartIndex = this.carts.length - 1;
              this.item.cart = this.carts[this.lastCartIndex];
              // add item to user's new cart
              this.addItemToOpenCart();
            }
          }
        }
      });
    }
  }

  async createCartAndAddItem() {
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
    this.item = new ItemModel();
    this.item.cart = this.newCart;
    this.item.product = this.product;
    this.item.quantity = this.quantity;
    this.item.price = this.product.price*this.quantity;
    try {
      this.item = await this.myItemsService.addItem(this.item);
      this.myProductsService.updateCart(true);
    }
    catch (err) {
      console.log("problem adding item to cart");
    }
  }

  async addItemToOpenCart() {
    this.item = new ItemModel();
    this.lastCartIndex = this.carts.length -1;
    this.item.cart = this.carts[this.lastCartIndex];
    this.item.product = this.product;
    this.item.quantity = this.quantity;
    this.item.price = this.product.price*this.quantity;
    try {
      this.item = await this.myItemsService.addItem(this.item);
      this.myProductsService.updateCart(true);
    }
    catch (err) {
      console.log("problem adding item to cart");
    }
  }
}


