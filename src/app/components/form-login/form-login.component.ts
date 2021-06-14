import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  formLogin: FormGroup;
  respuesta!: any;
  message: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
   
    this.message = '';

    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void>{
   
    this.respuesta = await this.userService.userLogin(this.formLogin.value);
  
    if(this.respuesta !== null ){ 
      this.message = this.respuesta.message;
    } 
    localStorage.setItem('loggedUser', JSON.stringify(this.respuesta));

    this.router.navigate(['/home']);
  }   
}
