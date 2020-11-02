import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {User} from './models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    user : User;

    constructor(private authService: AuthService, private router: Router) {}

    userConnected() {
        const connected = this.authService.userConnected();
        if(connected){
            this.user = this.authService.getCurrentUser();
        }
        return connected;
    }

    logOut() {
        this.authService.deleteCurrentUser();
        this.router.navigateByUrl('/')
        window.location.reload(); // (in case of the user logs out on Home page)
    }
}
