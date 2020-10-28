import { Injectable } from '@angular/core';  
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable } from 'rxjs';  
import { environment } from 'src/environments/environment';

@Injectable({  
  providedIn: 'root'  
})  
export class LoginService {  
  url :string;  
  token : string;  
  header : any;  
  constructor(private http : HttpClient) {   
  
    this.url = environment.url;  
  }  
  Login(model : any){  
    debugger;  
     var a =this.url+'UserLogin';  
   return this.http.post<any>(this.url+'UserLogin',model,{ headers: this.header});  
  }   
} 