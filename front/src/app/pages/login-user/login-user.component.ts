import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { defaultsDeep } from 'lodash';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  @Output() wantedToSignUp = new EventEmitter<boolean>();
  loginForm : FormGroup;
  hidePassword = true;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  wantToSignUp(){
    this.wantedToSignUp.emit(true);
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const login = defaultsDeep({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
