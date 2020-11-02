import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Cv} from '../models/cv.model';
import {CvService} from '../services/cv.service';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CvResolver implements Resolve<Cv> {

    constructor(private cvService: CvService, private authService: AuthService) {}

    /**
     * return the CV's data of the current user
     */
    resolve(): Observable<Cv> {
        return this.cvService.getCv(this.authService.getCurrentUser().idCv);
    }
}
