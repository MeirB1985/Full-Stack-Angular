import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryComponent } from './components/home-area/inventory/inventory.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { PleaseWaitComponent } from './components/shared-area/please-wait/please-wait.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyCartComponent } from './components/cart-area/my-cart/my-cart.component';
import { CategoriesComponent } from './components/products-area/categories/categories.component';
import { DialogComponent } from './components/products-area/dialog/dialog.component';
import { SearchResultsComponent } from './components/products-area/search-results/search-results.component';
import { ItemCardComponent } from './components/items-area/item-card/item-card.component';
import { MyOrderComponent } from './components/order-area/my-order/my-order.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './components/order-area/receipt/receipt.component';
import { MatSidenavModule } from '@angular/material/sidenav'

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        LogoComponent,
        HomeComponent,
        InventoryComponent,
        ProductListComponent,
        Page404Component,
        ProductCardComponent,
        AddProductComponent,
        PleaseWaitComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        AuthMenuComponent,
        AdminComponent,
        MyCartComponent,
        CategoriesComponent,
        DialogComponent,
        SearchResultsComponent,
        ItemCardComponent,
        MyOrderComponent,
        ReceiptComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        NgSelectModule,
        MatDialogModule,
        MatNativeDateModule,
        MatDatepickerModule,
        CommonModule,
        MatSidenavModule
    ],

    // Tell Angular to create a DI object from ArrayService for the entire app: 
    // providers: [ArrayService],

    // Register the interceptor so any request will invoke it: 
    providers: [{
        provide: MatDialogRef, useValue: {}
    },{ 
        provide: MAT_DIALOG_DATA, useValue: {} 
    }],

    bootstrap: [LayoutComponent]
})
export class AppModule { }
