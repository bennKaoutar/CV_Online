import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  public _loginForm: FormGroup;
  public _formErrors: any;
  public _submitted = false;
  public _errorMessage = '';
  public router: Router;
  public form: FormGroup;
  public email: AbstractControl;
  public username: AbstractControl;
  public password: AbstractControl;

  constructor(router: Router, fb: FormBuilder, private _router: Router) {
    this.router = router;
    this.form = fb.group({
      email: ['',],
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.email = this.form.controls.email;
    this.username = this.form.controls.username;
    this.password = this.form.controls.password;
  }

  ngOnInit(): void {
  }

}
