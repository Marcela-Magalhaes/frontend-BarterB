import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product!: Product;
  user!: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( async params => {
     // Comprobar si existe el id del producto
     const productsList = await this.productService.getAllProducts();
     const checkId = productsList.find( producto => producto._id === params.productId);
     

     // Si existe
     if(checkId !== undefined ){
      this.product = await this.productService.getProductById(params.productId);
     
      this.user = await this.userService.getUserById(this.product.userId);

      // Si no existe
     } else {
       this.router.navigate(['**']);
     }
     
    });
  }

  checkLogin(): void{
    let recoveredData = localStorage.getItem('loggedUser');

    if( recoveredData === null ){
      this.router.navigate(['/register']);
    }else{
      this.router.navigate(['/user/products', this.user._id]);
    }
  }

  contactUser(): void {

    const checkToken = localStorage.getItem('loggedUser');
    if(checkToken === null){
      this.router.navigate(['/register', this.user]);
    } else {
      this.router.navigate(['/contacta', this.product._id])
    }
  }
}
