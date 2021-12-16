import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { AdminGuard } from './services/admin.guard';
import { CategoriesComponent } from './components/products-area/categories/categories.component';
import { SearchResultsComponent } from './components/products-area/search-results/search-results.component';
import { MyOrderComponent } from './components/order-area/my-order/my-order.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    { path: "products", canActivate: [AuthGuard], component: ProductListComponent },
    { path: "products/search/:id", canActivate: [AuthGuard], component: SearchResultsComponent },
    { path: "products/category/:id", canActivate: [AuthGuard], component: CategoriesComponent },
    { path: "orders/new", canActivate: [AuthGuard], component: MyOrderComponent },
    { path: "admin", canActivate: [AdminGuard], component: AdminComponent },
    { path: "admin/:id", canActivate: [AdminGuard], component: AdminComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" }, // pathMath: "full" --> exact
    { path: "**", component: Page404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
