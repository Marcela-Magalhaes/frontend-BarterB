import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  formUser: FormGroup;
  message: string;
  failMessage: string;
  checkUserMesage: string;
  checkLoggedUser: boolean;
  changePass: boolean;



  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.message = '';
    this.checkUserMesage = '';
    this.failMessage = '';
    this.checkLoggedUser = false;
    this.changePass = false;

    this.formUser = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,20})$/)]),
      address: new FormGroup({
        zipCode: new FormControl('', [Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
        district: new FormControl('', [Validators.required])
      }),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/(\+34|0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})/)]),
      imgUrl: new FormControl('', [])
    })
   }

  async ngOnInit(): Promise<void> {
    const recoveredData = localStorage.getItem('loggedUser');
    if(recoveredData !== null){
      this.checkLoggedUser = true;

      const parsedData = JSON.parse(recoveredData);
      const user = await this.userService.getUserById(parsedData.userId);

      this.formUser = new FormGroup({
        _id: new FormControl(user._id, []),
        name: new FormControl(user.name, [Validators.required, Validators.minLength(3)]),
        surname: new FormControl(user.surname, [Validators.required]),
        username: new FormControl(user.username, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(user.email, [Validators.required, Validators.pattern(/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/)]),
        password: new FormControl(user.password, [Validators.required, Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,20})$/)]),
        address: new FormGroup({
          zipCode: new FormControl(user.address.zipCode, [Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
          district: new FormControl(user.address.district, [Validators.required])
        }),
        phoneNumber: new FormControl(user.phoneNumber, [Validators.required, Validators.pattern(/(\+34|0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})/)]),
        imgUrl: new FormControl(user!.imgUrl, [])
      });
    }
  }

  async onSubmit(): Promise<void>{
   
    this.checkUserMesage = await this.userService.addUser(this.formUser.value);

    if(this.checkUserMesage === 'Successfully added user'){
      this.failMessage = ''; 
      this.message = this.checkUserMesage;
      
      setTimeout(()=>{
        this.router.navigate(['/home']);
      }, 2000);
      
    } else {
      this.failMessage = this.checkUserMesage; 
    }
  }

  saveImg($event: any): void{
    if($event.target.files.length > 0){
      this.formUser.value.imgUrl = $event.target.files[0].name;
    }
  }

  onClick(): void{
      this.changePass = true;
      
  }
}
