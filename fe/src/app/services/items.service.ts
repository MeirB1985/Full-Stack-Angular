import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import ItemModel from '../models/item.model';
import { itemAddedAction, itemsDownloadedAction, itemDeletedAction, itemDeleteAllAction } from '../redux/items-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  updateCart(itemDeleted: boolean) {
    this.subject.next({
      itemDeleted: itemDeleted
    });
  }

  getCartObservable(): Observable<any> {
      return this.subject.asObservable();
  }
  
  // Get all Items: 
  public async getAllItems(cartId: string) {
    // if (store.getState().itemsState.items.length === 0) {
        const items = await this.http.get<ItemModel[]>(environment.itemUrl + "all/" + cartId).toPromise();
        store.dispatch(itemsDownloadedAction(items));
    // }
    // return store.getState().itemsState.items;
    return items;
  }

  // Get one item: 
  public async getOneItem(id: string) {
    if (store.getState().itemsState.items.length === 0) {
        const items = await this.http.get<ItemModel[]>(environment.itemUrl).toPromise();
        store.dispatch(itemsDownloadedAction(items));
    }
    const item = store.getState().itemsState.items.find(p => p._id === id);
    return item;
  }

  // Add item: 
  public async addItem(item: ItemModel) {
    const myFormData: FormData = ItemModel.convertToFormData(item);
    const addedItem = await this.http.post<ItemModel>(environment.itemUrl, myFormData).toPromise();
    store.dispatch(itemAddedAction(addedItem));
    return addedItem;
  }

  // Delete product: 
  public async deleteItem(id: string) {
    await this.http.delete(environment.itemUrl + id).toPromise();
    store.dispatch(itemDeletedAction(id));
  }

  // Delete all: 
  public async deleteAll() {
    await this.http.delete(environment.itemUrl).toPromise();
    store.dispatch(itemDeleteAllAction());
  }
}
