import { Component, OnInit, Input } from '@angular/core';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart.model';
import ItemModel from 'src/app/models/item.model';
import OrderModel from 'src/app/models/order.model';
import UserModel from 'src/app/models/user.model';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { ItemsService } from 'src/app/services/items.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { BookedDatesService } from 'src/app/services/bookeddates.service';

export interface DialogData {
  quantity: number;
}

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})

export class MyOrderComponent implements OnInit {

  private carts: CartModel[];
  private items: ItemModel[];
  public orders: OrderModel[];
  public bookedDates: any;
  public bookedDate: any;
  public user: UserModel;
  public order = new OrderModel();
  public cart: CartModel;
  public totalPrice: number = 0;
  public unsubscribeMe: Unsubscribe;
  private lastCartIndex: number;
  public dialogRef: any;
  public result: any;
  public today = new Date();
  public checkDate = new Date();
  public date = OrderModel;
  public newDate: Date;
  public creditCard: string;
  public myFilter: any;
  public getTime: any;

  constructor(
    private myCartsService: CartsService,
    private myOrdersService: OrdersService,
    private myBookedDatesService: BookedDatesService,
    private myItemsService: ItemsService,
    private notify: NotifyService,
    public dialog: MatDialog,
    private myRouter: Router
  ) { }

  async ngOnInit() {
    this.user = store.getState().authState.user;
    try {
      this.carts = await this.myCartsService.getAllCarts(this.user._id);
    }
    catch (err) {
      console.log("err getting user carts");
    }
    try {
      this.orders = await this.myOrdersService.getAllUserOrders(this.user._id);
    }
    catch (err) {
      console.log("err getting user carts");
    }
    try {
      this.bookedDates = await this.myBookedDatesService.getAllBookedDates();
    }
    catch (err) {
      console.log("err getting booked dates");
    }
    
    this.myFilter = (d: any): boolean => {
      const day = (d || new Date()).getDay();
      return day !== 5 && day !== 6;
    }
  }

  getUsersCity() {
    this.order.city=this.user.city;
  }

  getUsersSt() {
    this.order.st = this.user.st;
  }

  cardValidation() {
    const cardRegEx = '/^(?:4[0-9]{12}(?:[0-9]{3})?)$/ || /^(?:5[1-5][0-9]{14})$/ || /^(?:3[47][0-9]{13})$/ || /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/';
    if (this.order.card !== cardRegEx) {
      return false;
    } else {
      return true;
    }
  }

  async makeOrder() {
    this.user = store.getState().authState.user;
    try {
      this.carts = await this.myCartsService.getAllCarts(this.user._id);
    }
    catch (err) {
      console.log("err getting user carts-order page");
    }
    this.order.user = this.user;
    this.lastCartIndex = this.carts.length - 1;
    try {
      this.items = await this.myItemsService.getAllItems(this.carts[this.lastCartIndex]._id);
    }
    catch (err) {
      console.log("err getting user carts");
    }
    this.order.cart = this.carts[this.lastCartIndex];
    for (let item of this.items) {
      this.totalPrice += item.price;
    }
    this.order.price = this.totalPrice;
    this.order.orderDate = new Date().toLocaleDateString();
    this.order.shippingDate = this.order.shippingDate.toLocaleString();
    try {
      this.order = await this.myOrdersService.addOrder(this.order);
    }
    catch (err) {
      console.log("problem creating order");
    }
    this.creditCard = this.creditCard.toString();
    this.order.card = this.creditCard.substring(this.creditCard.length - 4);
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {invoice: this.cart},
    });
    
    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.myRouter.navigateByUrl("/home");
      this.result = result;
    });
    
  }
  
}

