import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import CategoryModel from 'src/app/models/category.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    public products: ProductModel[];
    public categories: CategoryModel[];
    public category: CategoryModel;
    public searchedKeyword: string;
    public user: UserModel;
    public id: string;

    constructor(
        private myProductsService: ProductsService,
        private myCategoriesService: CategoryService
        ) { }

    async ngOnInit() {
        this.user = store.getState().authState.user;
        try {
            this.products = await this.myProductsService.getAllProducts();
        }
        catch (err) {
            console.log(err);
        }
        try {
            this.categories = await this.myCategoriesService.getAllCategories();
        }
        catch (err) {
            console.log(err);
        }
    }
}
