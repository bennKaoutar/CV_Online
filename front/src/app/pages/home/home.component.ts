import { LoginService } from './../../services/login.service';
import { defaultsDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import {Cv} from '../../models/cv.model';
import {CvService} from '../../services/cv.service';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cvs: Cv[];
  cv: Cv; 
  firstName:string;

  constructor(private cvService: CvService, private router: Router) { }

  ngOnInit(): void {
    this.cvService.getCvs().subscribe(cvs => this.cvs = cvs);
  }

  goToCvView(id: number){
    this.router.navigateByUrl(`/cv-view/${id}`);
  }
  goToContact(id: number){
    this.router.navigateByUrl(`//${id}`);
  }

  onSubmit(ngForm: NgForm) {
    //console.log(ngForm.form.value.myemail);
    const user = defaultsDeep({
      myemail: ngForm.form.value.mail,
      mypass: ngForm.form.value.pass,
});
     
    //console.log(ngForm.value);

  }
  search(){
    if(this.firstName != ""){
    this.cvs=this.cvs.filter(res=>
      {
      return res.user.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
     })
    }
    else{
      this.ngOnInit();
    }
  } 

}
