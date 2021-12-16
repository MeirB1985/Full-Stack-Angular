import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import store from '../redux/store';
import { usersDownloadedAction } from '../redux/user-state';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Get all products: 
  public async getAllUsers() {
      if (store.getState().usersState.users.length === 0) {
          const users = await this.http.get<UserModel[]>(environment.usersUrl).toPromise();
          store.dispatch(usersDownloadedAction(users));
      }
      return store.getState().usersState.users;
  }
}