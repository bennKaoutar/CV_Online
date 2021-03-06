import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`).pipe(timeout(10000));
  }

  getUserFromCv(id: number): Observable<any> {
    return this.http.get<User[]>(`${this.url}/users/fromcv/${id}`).pipe(timeout(10000));
  }

  createCredentials(credentials: object): Observable<object> {
    return this.http.post<any>(`${this.url}/users/signup`, credentials).pipe(timeout(10000));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<any>(`${this.url}/users`, user).pipe(timeout(10000));
  }

  checkUser(credentials: object): Observable<User[]> {
    return this.http.post<any>(`${this.url}/users/login`, credentials).pipe(timeout(10000));
  }

  setEmail(emailUser: object): Observable<User> {
    return this.http.put<any>(`${this.url}/users/email`, emailUser).pipe(timeout(10000));
  }

  setPicture(idUser: number, id: number): Observable<User> {
    return this.http.post<any>(`${this.url}/users/setpicture/${id}`, idUser).pipe(timeout(10000));
  }

  setCustom(idUser: number, id: number): Observable<User> {
    return this.http.post<any>(`${this.url}/users/setcustom/${id}`, idUser).pipe(timeout(10000));
  }

}
