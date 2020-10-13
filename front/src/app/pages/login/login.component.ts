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
  email:string="";
  
  //StartAt=new Subject();
  //endAt=new Subject();

 

  constructor(private router:Router ){}
  

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
    
    console.log(this.email);
    this.router.navigateByUrl('/');

}
}
