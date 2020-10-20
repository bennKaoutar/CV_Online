import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

public _loginForm: FormGroup;
public _formErrors: any;
public _submitted = false;
public _errorMessage = '';
public form: FormGroup;
public firstname: AbstractControl;
public lastname: AbstractControl;
public email: AbstractControl;
public username: AbstractControl;
public password: AbstractControl;
public age: AbstractControl;
public loginform: FormGroup;

  constructor(router: Router, fb: FormBuilder, private userService: UserService, private _router: Router) {

    this._router = router;
    this.form = fb.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.firstname = this.form.controls.firstname;
    this.lastname = this.form.controls.lastname;
    this.email = this.form.controls.email;
    this.username = this.form.controls.username;
    this.password = this.form.controls.password;
    this.age = this.form.controls.age;
  }

  ngOnInit(): void {
  }

  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
    const user = defaultsDeep({
      id: null,
      firstName: ngForm.form.value.firstName,
      lastName: ngForm.form.value.lastName,
      email: ngForm.form.value.email,
      username: ngForm.form.value.username,
      password: ngForm.form.value.password,
      age: ngForm.form.value.age
    });

    // tslint:disable-next-line:no-shadowed-variable
    this.userService.addUser(user).subscribe(user => console.log(user));

    this._router.navigateByUrl('/');
  }
}

