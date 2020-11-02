import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hide = false; // to switch between SignIn and SignUp
  isConnected: boolean; // to modify the navbar when the user is/isn't connected

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isConnected = this.authService.userConnected(); // get currentUser to display his name
  }

  /**
   * Get the event, switch between SignIn and SignUp
   */
  onWantedToSignUp(hide: boolean){
    this.hide = hide;
  }

}
