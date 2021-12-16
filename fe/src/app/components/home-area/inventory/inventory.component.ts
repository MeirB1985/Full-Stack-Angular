import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import ProductModel from 'src/app/models/product.model';
import { OrdersService } from 'src/app/services/orders.service';
import OrderModel from 'src/app/models/order.model';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css'],
})

export class InventoryComponent implements OnInit {

    public products: ProductModel[];
    public orders: OrderModel[];
    public storeProducts: number;
    public storeOrders: number;

    constructor(
        private myProductsService: ProductsService,
        private myOrdersService: OrdersService,
        ) { }

    async ngOnInit() {
        try {
            this.products = await this.myProductsService.getAllProducts();
            this.storeProducts = this.products.length;
        }
        catch (err) {
            console.log(err);
        }
        try {
            this.orders = await this.myOrdersService.getAllOrders();
            this.storeOrders = this.orders.length;
        }
        catch (err) {
            console.log(err);
        }
    }

}
