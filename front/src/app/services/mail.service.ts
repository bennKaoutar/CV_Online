import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Mail} from '../models/mail.model';

@Injectable({
    providedIn: 'root'
})
export class MailService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }

    sendMail(mail: Mail): Observable<Mail> {
        return this.http.post<any>(`${this.url}/mail`, mail).pipe(timeout(10000));
    }

}
