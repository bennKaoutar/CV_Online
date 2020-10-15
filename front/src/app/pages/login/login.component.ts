import { Router } from '@angular/router';
import { SearchBarService } from 'src/app/services/search/search-bar.service';
import { Component, OnInit } from '@angular/core';
import{FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  Validators,
  NgForm
} from '@angular/forms';
import { LoginUser } from 'src/app/models/loginUser';
//import{Subject} from "rxjs/Subject";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users;
  //StartAt=new Subject();
  //endAt=new Subject();

  loginForm: FormGroup;
  /*email: AbstractControl;
  password: AbstractControl;
  loginUser:LoginUser;*/

  constructor(
    private router:Router,
    private readonly formBuilder: FormBuilder,private serach:SearchBarService) {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
      /*email: [null, [Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]*/
    });

    /*this.email = this.loginForm.controls.email;
    this.password = this.loginForm.controls.password;*/
  }
  

  ngOnInit(): void {
    /*this.serach.getUsers(this.StartAt,this.endAt)
                .subscribe(users => this.users = users);*/
  }
 /* search($event){
    let q= $event.target.value;
    this.StartAt.next(q)
    this.endAt.next(q+"\uf8ff")
  }*/
  onSubmit() {
    /*this.loginUser = {
      email: f.value.email,
      password: f.value.password

    };*/
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());
  } else {
      console.log('There is a problem with the form');
  }
   
    this.router.navigateByUrl('/');

}
}
