import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  addProduct(pProduct: Product): Promise<string>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json; charset=UTF-8' })
    }

    const message = this.httpClient.post<string>('http://localhost:3000/products', pProduct, httpOptions).toPromise();
    return message;
  }

  getProductById(pId: string): Promise<Product>{
    return this.httpClient.get<Product>(`http://localhost:3000/products/${pId}`).toPromise();
  }

  getAllProducts(): Promise<Product[]>{
    return this.httpClient.get<Product[]>('http://localhost:3000/products').toPromise();
  }

  updateProduct(pId: string, pUpdatedData: Product): Promise<string>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json; charset=UTF-8' })
    }
    const message = this.httpClient.put<string>(`http://localhost:3000/products/${pId}`, pUpdatedData, httpOptions).toPromise();
    return message;
  }

  deleteProduct(pId: string): Promise<string>{
    return this.httpClient.delete<string>(`http://localhost:3000/products/${pId}`).toPromise();
  }

  searchProducts(pSearchedProduct: string): Promise<Product[]>{
    return this.httpClient.get<Product[]>(`http://localhost:3000/products/search/${pSearchedProduct}`).toPromise();
  }

  getProductsByUserId(pUserId: string): Promise<Product[]>{
    return this.httpClient.get<Product[]>(`http://localhost:3000/products/user/${pUserId}`).toPromise();
  }
}
