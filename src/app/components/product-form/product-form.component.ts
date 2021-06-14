import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  formProduct: FormGroup;
  arrCategories: Category[];
  message: string;
  categoria: Category | undefined;
  userId: string;
  productId: string;
  formTitle: boolean;
  updateTitle: boolean;
  paramsValue: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.arrCategories = [];
    this.message = '';
    this.userId = '';
    this.productId = '';
    this.updateTitle = false;
    this.formTitle = false;
    this.paramsValue = '';

    this.formProduct = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      imgUrl: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      userId: new FormControl('', [])
    });
   }

  async ngOnInit(): Promise<void> {
    try {
    this.arrCategories = await this.categoryService.getAllCategories();
    
    this.activatedRoute.params.subscribe( async params => {
      if(params.userId !== undefined){
        this.paramsValue = 'userId';
        this.userId = params.userId;
        this.formTitle = true;

      } else if(params.productId !== undefined) {
        this.paramsValue = 'productId';
        this.productId = params.productId;
        this.updateTitle = true;

        const product = await this.productService.getProductById(this.productId);
        const categoria = await this.categoryService.getCategoryById(product.categoryId);
      
        this.formProduct = new FormGroup({
          _id: new FormControl(product._id, []),
          name: new FormControl(product.name, [Validators.required]),
          description: new FormControl(product.description, []),
          imgUrl: new FormControl(product!.imgUrl, [Validators.required]),
          categoryId: new FormControl(categoria.name, [Validators.required]),
          userId: new FormControl(product.userId, [])
        }); 
        this.userId = product.userId;
      }  
    })
    } catch (error) {
      console.log('Error al cargar componente', error); 
    }
  }

  getImg($event: any): void{
    
    if($event.target.files.length > 0){
      this.formProduct.value.imgUrl = $event.target.files[0].name;
    }
  
  }

   selectCategory($event: any): void{
    const categoryName = $event.target.value;
    this.categoria = this.arrCategories.find(categoria => categoria.name === categoryName);
  }

  async onSubmit(): Promise<void>{
    try {
      this.formProduct.value.categoryId = this.categoria?._id;
      this.formProduct.value.userId = this.userId;

      if(this.paramsValue === 'userId'){
        this.message = await this.productService.addProduct(this.formProduct.value);
      } else if(this.paramsValue === 'productId'){
        this.formProduct.value.userId = this.userId;
        this.message = await this.productService.updateProduct(this.productId, this.formProduct.value);
      }
      

      setTimeout(() => {
        this.router.navigate(['/profile', this.formProduct.value.userId]);
      }, 2000);
    } catch (error) {
      console.log('Error al enviar formulario', error);
    }
  }
}
