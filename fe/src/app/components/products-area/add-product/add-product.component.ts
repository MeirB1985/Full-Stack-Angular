import { ProductsService } from './../../../services/products.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import CategoryModel from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';


@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

    // We must create an empty object for the Two-Way Binding:
    public product = new ProductModel();
    public imageVisited: boolean;
    public categories: CategoryModel[];

    constructor(
        private myProductsService: ProductsService,
        private myCategoriesService: CategoryService,
        private myRouter: Router,
        private notify: NotifyService) { }

    public saveImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    public imageBlur(): void {
        this.imageVisited = true;
    }

    async ngOnInit() {
        try {
            this.categories = await this.myCategoriesService.getAllCategories();
        }
        catch (err) {
            console.log(err);
        }
    }
      
    public async send() {
        try {
            await this.myProductsService.addProduct(this.product);
            this.notify.success("Product has been added.");
            this.myRouter.navigateByUrl("/admin");
        }
        catch(err) {
            console.log(err);
        }
    }
    
}
