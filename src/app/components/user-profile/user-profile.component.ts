import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user!: User;
  productsList: Product[] = [];
  category!: Category;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
      this.message ='';
   }

   ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {

     this.user = await this.userService.getUserById(params.userId);
     this.productsList = await this.productService.getProductsByUserId(this.user._id);
    });
  }

  async deleteProduct(pProductId: string): Promise<string>{
    const result = window.confirm('¿Quieres eliminar este producto?');
    if(result){
      this.message = await this.productService.deleteProduct(pProductId);
    } 
    return this.message;
  } 
}
