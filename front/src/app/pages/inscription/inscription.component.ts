import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {UserService} from '../../services/user.service';
import { defaultsDeep } from 'lodash';

// import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  public _formErrors: any;
  public _submitted = false;
  public _errorMessage = '';
  public router: Router;
  public inscriptionform: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;
  public username: AbstractControl;
  public password: AbstractControl;
  public age: AbstractControl;


  constructor(router: Router, public fb: FormBuilder, private _router: Router, private userService: UserService) {
    this.router = router;
  }

  ngOnInit(): void {
    this.inscriptionform = this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      age: ['',],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  public onSubmit(): void{
    if(this.inscriptionform.valid){
     this._submitted = true;
      // tslint:disable-next-line:no-shadowed-variable
      this.userService.addUser(this.inscriptionform.value).subscribe(this.inscriptionform.value);
    }
  }

}
