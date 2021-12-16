import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CartModel from '../models/cart.model';
import { cartAddedAction, cartDeletedAction, cartsDownloadedAction, cartUpdatedAction } from '../redux/carts-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

    // Get all Carts: 
    public async getAllCarts(userId: string) {
        if (store.getState().cartsState.carts.length === 0) {
            const carts = await this.http.get<CartModel[]>(environment.cartsUrl + "all/" + userId).toPromise();
            store.dispatch(cartsDownloadedAction(carts));
        }
        return store.getState().cartsState.carts;
    }

    // Get one cart: 
    public async getOneCart(id: string) {
        if (store.getState().cartsState.carts.length === 0) {
            const carts = await this.http.get<CartModel[]>(environment.cartsUrl).toPromise();
            store.dispatch(cartsDownloadedAction(carts));
        }
        const cart = store.getState().cartsState.carts.find(p => p._id === id);
        return cart;
    }

    // Add cart: 
    public async addCart(cart: CartModel) {
        const myFormData: FormData = CartModel.convertToFormData(cart);
        const addedCart = await this.http.post<CartModel>(environment.cartsUrl, myFormData).toPromise();
        store.dispatch(cartAddedAction(addedCart));
        return addedCart;
    }

    // Update cart: 
    public async updateCart(cart: CartModel) {
        const myFormData: FormData = CartModel.convertToFormData(cart);
        const updatedCart = await this.http.put<CartModel>(environment.cartsUrl + cart._id, myFormData).toPromise();
        store.dispatch(cartUpdatedAction(updatedCart));
        return updatedCart;
    }

    // Delete cart: 
    public async deleteCart(id: string) {
        await this.http.delete(environment.cartsUrl + "all/" + id).toPromise();
        store.dispatch(cartDeletedAction(id));
    }
}
