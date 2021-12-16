import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CategoryModel from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    public category: CategoryModel;
    public categories: CategoryModel[];
    public searchedKeyword: string;
    public id: string;

    constructor(
        private myActivatedRoute: ActivatedRoute,
        private myRouter: Router,
        private myCategoriesService: CategoryService) { }

    async ngOnInit() {
        try {
            const id = this.myActivatedRoute.snapshot.params.id;
            this.category = await this.myCategoriesService.getOneCategory(id);
            console.log("ngoninit");
            console.log(this.category.name);
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

    async routerLink(id: string) {
        try {
            // this.id = this.myActivatedRoute.snapshot.params.id;
            this.category = await this.myCategoriesService.getOneCategory(id);
            console.log("router");
            console.log(this.category.name);
        }
        catch (err) {
            console.log(err);
        }
        this.myRouter.navigateByUrl("/products/category/" + id);
    }
}
