import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  // emit event to switch from SignIn to SignUp
  @Output() wantedToSignUp = new EventEmitter<boolean>();
  loginForm: FormGroup;
  hidePassword = true;
  errorMessage: string;

  user: User;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  /**
   * Emit event to switch from SignIn to SignUp
   */
  wantToSignUp() {
    this.wantedToSignUp.emit(true);
  }

  /**
   * When logged in navigate to CV Template
   */
  goToCvView(){
    this.router.navigateByUrl(`/cv-template`);
  }

  /**
   * Submit SignIn form
   */
  onSubmit() {
    // get credentials from form
    const credentials = defaultsDeep({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
    // check in backend if the email and password are corrects
    this.userService.checkUser(credentials).subscribe(users => {
      this.user = users[0];
      if(users.length !== 0){ // if the credentials are OK
        this.authService.setCurrentUser(this.user); // set current user
        this.goToCvView() // naviagte to the template
      } else {
        this.errorMessage = 'No such user. Either the login or password are wrong.';
      }
    });
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
}
