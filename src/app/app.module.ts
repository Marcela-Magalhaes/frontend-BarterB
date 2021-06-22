import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { ContactaComponent } from './components/contacta/contacta.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductViewComponent,
    ProductsListComponent,
    NotFoundComponent,
    CategoriesListComponent,
    FormLoginComponent,
    UserFormComponent,
    UserProfileComponent,
    UserProductsComponent,
    ContactaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
