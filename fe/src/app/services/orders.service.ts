import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import OrderModel from '../models/order.model';
import store from '../redux/store';
import { orderAddedAction, ordersDownloadedAction } from '../redux/orders-state';
import { itemDeleteAllAction } from '../redux/items-state';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

    // Get all Orders: 
    public async getAllOrders() {
        if (store.getState().ordersState.orders.length === 0) {
            const orders = await this.http.get<OrderModel[]>(environment.ordersUrl).toPromise();
            store.dispatch(ordersDownloadedAction(orders));
        }
        return store.getState().ordersState.orders;
    }

    // Get all UserOrders: 
    public async getAllUserOrders(userId: string) {
        if (store.getState().ordersState.orders.length === 0) {
            const orders = await this.http.get<OrderModel[]>(environment.ordersUrl + "all/" + userId).toPromise();
            store.dispatch(ordersDownloadedAction(orders));
        }
        return store.getState().ordersState.orders;
    }

    // Get one order: 
    public async getOneOrder(id: string) {
        if (store.getState().ordersState.orders.length === 0) {
            const orders = await this.http.get<OrderModel[]>(environment.ordersUrl).toPromise();
            store.dispatch(ordersDownloadedAction(orders));
        }
        const order = store.getState().ordersState.orders.find(p => p._id === id);
        return order;
    }

    // Add order: 
    public async addOrder(order: OrderModel) {
        const myFormData: FormData = OrderModel.convertToFormData(order);
        const addedOrder = await this.http.post<OrderModel>(environment.ordersUrl, myFormData).toPromise();
        store.dispatch(orderAddedAction(addedOrder));
        store.dispatch(itemDeleteAllAction());
        return addedOrder;
    }
}

