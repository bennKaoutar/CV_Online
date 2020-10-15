import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';
import {CvService} from '../../services/cv.service';

@Component({
  selector: 'app-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.css']
})
export class CvTemplateComponent implements OnInit {
  myuser: any;
  myeducation: any;
  myexperience: any;
  myskills: any;
  mylanguages: any;
  myactivities: any;
  textAreasList:any = [];
  test: any;

  constructor(private cvService: CvService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
    const cv = defaultsDeep({
      id: null,
      user: ngForm.form.value.user,
      education: ngForm.form.value.education,
      experience: ngForm.form.value.experience,
      skills: ngForm.form.value.skills,
      languages: ngForm.form.value.languages,
      activities: ngForm.form.value.activities
    });

    this.cvService.addCv(cv).subscribe(cv => console.log(cv));
    this.router.navigateByUrl('/')
  }

  addTextarea(){
    this.textAreasList.push('');
  }


  removeTextArea(index){
    this.textAreasList.splice(index, 1);
  }

  trackByFn(index: any){
    return index;
  }
}
