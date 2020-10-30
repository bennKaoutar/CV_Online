import {Injectable} from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }


    setCurrentUser(user: User) {
        if(user != null){
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    deleteCurrentUser(){
        localStorage.removeItem('currentUser');
    }

    userConnected(): boolean {
        return this.getCurrentUser() != null;
    }
}