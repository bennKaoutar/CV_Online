import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Cv} from '../models/cv.model';

@Injectable({
    providedIn: 'root'
})
export class CvService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }

    getCvs(): Observable<Cv[]>{
        return this.http.get<Cv[]>(`${this.url}/cvs`).pipe(timeout(10000));
    }

    getCv(id: number): Observable<any> {
        return this.http.get<Cv>(`${this.url}/cvs/${id}`).pipe(timeout(10000));
    }

    addCv(cv: Cv): Observable<Cv> {
        return this.http.post<any>(`${this.url}/cvs`, cv).pipe(timeout(10000));
    }
}