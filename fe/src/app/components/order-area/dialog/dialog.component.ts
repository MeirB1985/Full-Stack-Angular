import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import CartModel from 'src/app/models/cart.model';
import ItemModel from 'src/app/models/item.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import OrderModel from 'src/app/models/order.model';

export interface DialogData {
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  public items: ItemModel[];
  private carts: CartModel[];
  public order: OrderModel;
  public orders: OrderModel[];
  public user: UserModel;
  public orderId: string;
  private lastCartIndex: number;
  private lastOrderIndex: number;
  public fileUrl = "http://localhost:3030/api/orders/database/orders/";
  public fileName: string;

  constructor(
    private myCartsService: CartsService,
    private myOrdersService: OrdersService,

    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  async ngOnInit() {
    this.user = store.getState().authState.user;
    try {
      this.carts = await this.myCartsService.getAllCarts(this.user._id);
    }
    catch (err) {
      console.log("err getting user carts");
    }
    this.lastCartIndex = this.carts.length - 1;
    try {
    this.orders = await this.myOrdersService.getAllUserOrders(this.user._id);
    }
    catch (err) {
      console.log("err getting user carts");
    }
    this.lastOrderIndex = this.orders.length - 1;
    this.orderId = this.orders[this.lastOrderIndex]._id.toString();
    // this.fileName = "61b9b8b84602910faeea6385.txt";
    this.fileName = this.orderId + ".txt";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
