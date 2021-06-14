import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contacta',
  templateUrl: './contacta.component.html',
  styleUrls: ['./contacta.component.css']
})
export class ContactaComponent implements OnInit {

  contactaForm: FormGroup;
  product!: Product;
  user!: User;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService
  ) {
    this.contactaForm = new FormGroup({
      ownerUserId: new FormControl('', []),
      title: new FormControl('', []),
      message: new FormControl('', []),
      selectedProduct: new FormControl('', [])
    });
   }

  async ngOnInit(): Promise<void> {

    const recoveredData = localStorage.getItem('loggedUser');
    const loggedUserId = JSON.parse(recoveredData!).userId;
    const loggedUser = await this.userService.getUserById(loggedUserId);

    this.activatedRoute.params.subscribe( async params => {
    
    this.product = await this.productService.getProductById(params.productId);

    this.user = await this.userService.getUserById(this.product.userId);

      this.contactaForm = new FormGroup({
      ownerUserId: new FormControl('', []),
      title: new FormControl('Alguién está interesado en uno de tus productos de BarterB.', []),
      message: new FormControl(`Hola ${this.user!.name}, tengo interés en el producto '${this.product!.name }' y si te parece bien, podemos concretar el trueque. Mi correo es xxx@xxx.com y mi teléfono es 000 111 222.\nAguardo tu respuesta.\n\nUn saludo, ${loggedUser.name}.`, []),
      selectedProduct: new FormControl('', [])
      });
    });
  }

  onSaveForm(): void{
    
    this.contactaForm.controls.ownerUserId.setValue(this.product.userId);
    this.contactaForm.controls.selectedProduct.setValue(this.product._id);
    
   // console.log(this.contactaForm.value);
  }
}
