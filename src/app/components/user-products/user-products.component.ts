import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {

  user!:User;
  productsList: Product[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( async params => {
      
      this.user = await this.userService.getUserById(params.userId);
      this.productsList = await this.productService.getProductsByUserId(params.userId);
    })
  }

}
