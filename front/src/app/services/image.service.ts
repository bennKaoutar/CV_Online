import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Image} from '../models/image.model';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }

    getImage(id: number): Observable<any> {
        return this.http.get<Image>(`${this.url}/image/${id}`).pipe(timeout(10000));
    }

    uploadImage(img: FormData): Observable<Image> {
        return this.http.post<any>(`${this.url}/image/upload`, img).pipe(timeout(10000));
    }
}