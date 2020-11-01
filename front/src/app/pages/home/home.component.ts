import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hide = false;
  isConnected: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isConnected = this.authService.userConnected();
  }

  onWantedToSignUp(hide: boolean){
    this.hide = hide;
  }

}
