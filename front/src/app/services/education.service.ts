import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Education} from '../models/education.model';



@Injectable({
    providedIn: 'root'
})
export class EducationService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }

    addEducation(education: Education): Observable<User> {
        return this.http.post<any>(`${this.url}/education`, education).pipe(timeout(10000));
    }
}
