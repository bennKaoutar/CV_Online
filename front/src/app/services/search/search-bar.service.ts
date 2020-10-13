import { Injectable } from '@angular/core';
import {User} from 'src/app/models/user.model' ;
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }
}
