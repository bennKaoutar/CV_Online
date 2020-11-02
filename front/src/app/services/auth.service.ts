import {Injectable} from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {}

    setCurrentUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    // delete current user when log out
    deleteCurrentUser(){
        localStorage.removeItem('currentUser');
    }

    userConnected(): boolean {
        return this.getCurrentUser() != null;
    }
}
