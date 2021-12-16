import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { CategoryService } from 'src/app/services/category.service';
import CategoryModel from 'src/app/models/category.model';
import UserModel from 'src/app/models/user.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public products: ProductModel[];
  public product = new ProductModel();
  public categories: CategoryModel[];
  public category: CategoryModel;
  public user: UserModel;
  public imageUrl = environment.productImagesUrl;

  // FormGroup is an object representing the <form> element: 
  public productForm: FormGroup;

  // FormControl is an object representing an <input>/<select>/<textarea> element:
  public nameControl: FormControl;
  public priceControl: FormControl;
  public categoryControl: FormControl;
  public imageControl: FormControl;

  constructor(
    private myProductsService: ProductsService,
    private myActivatedRoute: ActivatedRoute,
    private myCategoriesService: CategoryService,
    private notify: NotifyService,
    private myRouter: Router) {

      this.nameControl = new FormControl(null, [Validators.required, Validators.pattern("^[A-Z].*$")]);
      this.priceControl = new FormControl(null, Validators.required);
      this.categoryControl = new FormControl(null, Validators.required);
      this.imageControl = new FormControl();
      this.productForm = new FormGroup({
          nameControl: this.nameControl,
          priceControl: this.priceControl,
          categoryControl: this.categoryControl,
          imageControl: this.imageControl
      });
    }

  async ngOnInit() {
    try {
      this.products = await this.myProductsService.getAllProducts();
    }
    catch (err) {
      console.log("cant get products");
    }
    try {
      this.categories = await this.myCategoriesService.getAllCategories();
    }
    catch (err) {
      console.log("cant get categories");
    }
  }

  public saveImage(args: Event): void {
    this.product.image = (args.target as HTMLInputElement).files;
  }

  public async getThisProduct(p: ProductModel) {
    this.nameControl.setValue(p.name);
    this.priceControl.setValue(p.price);
    this.categoryControl.setValue(p.category);
    this.myRouter.navigateByUrl("/admin/"+ p._id);
  }

  public async edit() {
    try {
      const id = this.myActivatedRoute.snapshot.params.id;
      this.product._id = id;
      this.product.name = this.nameControl.value;
      this.product.price = this.priceControl.value;
      for (this.category of this.categories) {
        this.product.categoryToSend === this.categoryControl.value;
      }
      this.product.categoryToSend = this.category._id;
      await this.myProductsService.editProduct(this.product);
      this.notify.success("Product has been updated.");
    }
    catch(err) {
        console.log("problem editing product");
    }
  }

  async refresh() {
    try {
      this.categories = await this.myCategoriesService.getAllCategories();
    }
    catch (err) {
      console.log("cant get categories");
    }
    try {
      const id = this.myActivatedRoute.snapshot.params.id;
      this.category = await this.myCategoriesService.getOneCategory(id);
    }
    catch (err) {
      console.log(err);
    }
  }
}
