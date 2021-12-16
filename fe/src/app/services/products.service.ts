import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import ProductModel from '../models/product.model';
import { productAddedAction, productDeletedAction, productsDownloadedAction, productEditedAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private subject = new Subject<any>();

    constructor(private http: HttpClient) { }

    updateCart(cartUpdated: boolean) {
        this.subject.next({
            cartUpdated: cartUpdated
        });
    }

    getCartObservable(): Observable<any> {
        return this.subject.asObservable();
    }

    // Get all products: 
    public async getAllProducts() {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        return store.getState().productsState.products;
    }

    // Get one product: 
    public async getOneProduct(id: string) {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        const product = store.getState().productsState.products.find(p => p._id === id);
        return product;
    }

    // Add product: 
    public async addProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, myFormData).toPromise();
        store.dispatch(productAddedAction(addedProduct));
        return addedProduct;
    }

    // Update product: 
    public async editProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const editedProduct = await this.http.put<ProductModel>(environment.adminUrl + product._id, myFormData).toPromise();
        store.dispatch(productEditedAction(editedProduct));
        return editedProduct;
    }

    // Delete product: 
    public async deleteProduct(id: string) {
        await this.http.delete(environment.productsUrl + id).toPromise();
        store.dispatch(productDeletedAction(id));
    }
}
