import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {

   }

   getAllCategories(): Promise<Category[]>{
    return this.httpClient.get<Category[]>('http://localhost:3000/categories').toPromise();
   }

   getProductsByCategory(pCategoryId: string): Promise<Product[]>{
    return this.httpClient.get<Product[]>(`http://localhost:3000/categories/category/${pCategoryId}`).toPromise();
   }
   
   getCategoryById(pCategoryId: string): Promise<Category>{
     return this.httpClient.get<Category>(`http://localhost:3000/categories/${pCategoryId}`).toPromise();
   }
}
