import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { ContactaComponent } from './components/contacta/contacta.component';
import { LoginUserGuard } from './login-user.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'/home' },
  { path: 'home', component: CategoriesListComponent },
  { path: 'categories/:categoryName', component: ProductsListComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:productId', component: ProductViewComponent },
  { path: 'product/register/:userId', component: ProductFormComponent, canActivate: [LoginUserGuard] },
  { path: 'product/update/:productId', component: ProductFormComponent, canActivate: [LoginUserGuard] },
  { path: 'profile/:userId', component: UserProfileComponent, canActivate: [LoginUserGuard] },
  { path: 'register', component: UserFormComponent },
  { path: 'signin', component: FormLoginComponent },
  { path: 'user/update/:userId', component: UserFormComponent, canActivate: [LoginUserGuard] },
  { path: 'search/:searchedProducts', component: ProductsListComponent },
  { path: 'user/products/:userId', component: UserProductsComponent, canActivate: [LoginUserGuard]  },
  { path: 'contacta/:productId', component: ContactaComponent, canActivate: [LoginUserGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
