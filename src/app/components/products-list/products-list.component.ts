import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productsList: Product[] = [];
  title: string;
  titulo: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
    ) { 
      this.title = '';
      this.titulo = '';
    }

  async ngOnInit(): Promise<void> {
    let product: Product;
    this.activatedRoute.params.subscribe(async (params) => {
      if(params.searchedProducts !== undefined){
        this.productsList = await this.productService.searchProducts(params.searchedProducts);
        this.titulo = params.searchedProducts;

      } else if( params.categoryName !== undefined){
        this.title= params.categoryName;
        
        let listaIdProductos = [];
        listaIdProductos = await this.categoryService.getProductsByCategory(params.categoryName);
       
        for(let productId of listaIdProductos){
          product = await this.productService.getProductById(String(productId));
          this.productsList.push(product);
        } 
      } else {
        this.productsList = await this.productService.getAllProducts();
      }
    });
  }
}
