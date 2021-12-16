import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CategoryModel from '../models/category.model';
import { categoryAddedAction, categoriesDownloadedAction } from '../redux/categories-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

    // Get all products: 
    public async getAllCategories() {
        if (store.getState().categoriesState.categories.length === 0) {
            const categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            store.dispatch(categoriesDownloadedAction(categories));
        }
        return store.getState().categoriesState.categories;
    }

    // Get one product: 
    public async getOneCategory(id: string) {
        if (store.getState().categoriesState.categories.length === 0) {
            const categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            store.dispatch(categoriesDownloadedAction(categories));
        }
        const category = store.getState().categoriesState.categories.find(p => p._id === id);
        return category;
    }

    // Add product: 
    public async addCategory(category: CategoryModel) {
        const myFormData: FormData = CategoryModel.convertToFormData(category);
        const addedCategory = await this.http.post<CategoryModel>(environment.categoriesUrl, myFormData).toPromise();
        store.dispatch(categoryAddedAction(addedCategory));
        return addedCategory;
    }
}
