import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { defaultsDeep } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  userForm : FormGroup;
  hide = true;

  ngOnInit() : void{
    this.userForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      age: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    console.log(this.userForm.value);
    const user = defaultsDeep({
      id: null,
      firstName: this.userForm.value.firstname,
      lastName: this.userForm.value.lastname,
      age: this.userForm.value.age,
      email: this.userForm.value.email,
      password: this.userForm.value.password
    });

    this.userService.addUser(user).subscribe(user => console.log(user));
    this.router.navigateByUrl('/');
  }

  get firstname() { return this.userForm.get('firstname') }
  get lastname() { return this.userForm.get('lastname') }
  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }
}
