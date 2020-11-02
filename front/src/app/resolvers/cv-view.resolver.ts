import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Cv} from '../models/cv.model';
import {CvService} from '../services/cv.service';

@Injectable({
    providedIn: 'root'
})
export class CvViewResolver implements Resolve<Cv> {

    constructor(private cvService: CvService) {}

    /**
     * Return the CV's data of the selected CV
     */
    resolve(route: ActivatedRouteSnapshot): Observable<Cv> {
        return this.cvService.getCv(route.params.id);
    }
}
