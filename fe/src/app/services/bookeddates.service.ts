import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import OrderModel from '../models/order.model';
import { bookedDatesDownloadedAction } from '../redux/bookeddates-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class BookedDatesService {

  constructor(private http: HttpClient) { }

  // Get all booked dates: 
  public async getAllBookedDates() {
    if (store.getState().bookedDatesState.bookedDates.length === 0) {
        const bookedDates = await this.http.get<OrderModel[]>(environment.ordersUrl + "bookeddates/").toPromise();
        store.dispatch(bookedDatesDownloadedAction(bookedDates));
    }
    return store.getState().bookedDatesState.bookedDates;
  }

}
