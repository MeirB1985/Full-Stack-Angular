import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import CategoryModel from 'src/app/models/category.model';
import ItemModel from 'src/app/models/item.model';
import ProductModel from 'src/app/models/product.model';
import UserModel from 'src/app/models/user.model';
import { CategoryService } from 'src/app/services/category.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  product: ProductModel;
  quantity: number;
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent implements OnInit {

  @Input()
  public product: ProductModel;

  public products: ProductModel[];
  public filteredArray: ProductModel[];
  public categories: CategoryModel[];
  public imageUrl = environment.productImagesUrl;
  public quantity: number;
  public user: UserModel;
  public item = new ItemModel();
  public searchedKeyword: string;

  constructor(
    private myProductsService: ProductsService,
    private myCategoriesService: CategoryService,
    private myActivatedRoute: ActivatedRoute,
    private notify: NotifyService,
    public dialog: MatDialog,
    private myRouter: Router
    ) { }

  async ngOnInit() {
    this.searchedKeyword = this.myActivatedRoute.snapshot.params.id;
    try {
      this.categories = await this.myCategoriesService.getAllCategories();
    }
    catch (err) {
      this.notify.error(err);
    }
    try {
      this.products = await this.myProductsService.getAllProducts();
    }
    catch (err) {
      this.notify.error(err);
    }
    this.filteredArray = this.products.filter(product=> product.name.toLowerCase().includes(this.searchedKeyword.toLowerCase()));
  }

  secondSearch() {
    this.filteredArray = this.products.filter(product=> product.name.toLowerCase().includes(this.searchedKeyword.toLowerCase()));
    this.myRouter.navigateByUrl("/products/search/" + this.searchedKeyword);
  }
}
