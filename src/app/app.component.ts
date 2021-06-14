import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  searchedValue: string;
  activo: boolean;
  userId: string;
  user!: User;

  constructor(
    private router: Router,
    private userService: UserService
    ){
    this.searchedValue = '';
    this.activo = false;
    this.userId = '';
  }

  async ngOnInit(): Promise<void>{
    const recoveredData = localStorage.getItem('loggedUser');
    if(recoveredData !== null){
      const parsedData = JSON.parse(recoveredData);
      if(parsedData.token !== '' && parsedData.userId !== ''){
        this.userId = parsedData.userId;
        this.activo = true;

       this.user = await this.userService.getUserById(this.userId);
      } 
    }

  }
  searchResult(): void{
    this.router.navigate(['/search', this.searchedValue]);
  }

  logout(): void{
    localStorage.removeItem('loggedUser');
  
    this.router.navigate(['/home']);
  }
}
