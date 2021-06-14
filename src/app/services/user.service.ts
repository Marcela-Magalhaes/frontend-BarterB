import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { 
  }

  addUser(pUser: User): Promise<string>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type:': 'x-www-form-urlencoded; charset=UTF-8' })
    }
    
    const message = this.httpClient.post<string>('http://localhost:3000/user/createUser', pUser, httpOptions).toPromise();
    return message;
  }

  getUserById(pId: string): Promise<User>{
    return this.httpClient.get<User>(`http://localhost:3000/user/${pId}`).toPromise();
   
  }

  updateUser(pId: string, pUpdatedData: User): Promise<User>{

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json; charset=UTF-8'})
    }
    const message =  this.httpClient.put<User>(`http://localhost:3000/user/${pId}`, pUpdatedData, httpOptions).toPromise();
    console.log('~ message ', message );
    
    return message;
  }

  deleteUser(pId: string): Promise<User>{
    const message = this.httpClient.delete<User>(`http://localhost:3000/user/${pId}`).toPromise();
    return message;
  }

  userLogin(pUserInfo: any): Promise<any>{

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json; charset=UTF-8' })
    }
    const message =  this.httpClient.post('http://localhost:3000/user/login', pUserInfo, httpOptions).toPromise();
    return message;
  }
}
