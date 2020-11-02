import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

    constructor(private userService: UserService) {}

    /**
     * return the CV's data of the current user
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.userService.getUserFromCv(route.params.id);
    }
}
