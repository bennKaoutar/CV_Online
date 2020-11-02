import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Custom} from '../models/custom.model';

@Injectable({
    providedIn: 'root'
})
export class CustomService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }

    getCustom(id: number): Observable<any> {
        return this.http.get<Custom>(`${this.url}/custom/${id}`).pipe(timeout(10000));
    }

    setCustom(custom: Custom): Observable<Custom> {
        return this.http.post<any>(`${this.url}/custom`, custom).pipe(timeout(10000));
    }

    deleteCustom(id: number): Observable<any> {
        return this.http.delete(`${this.url}/custom/delete/${id}`).pipe(timeout(10000));
    }
}
