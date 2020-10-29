import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';
import {CvService} from '../../services/cv.service';
import {EducationService} from '../../services/education.service';

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
  fb:any;
  git:any;
  linkedin: any;
  textAreasList:any = [];
  test: any;

  constructor(
      private cvService: CvService,
      private educationService: EducationService,
      private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(ngForm: NgForm) {
    console.log(this.textAreasList);

    this.textAreasList.forEach(ed => {
      console.log(ed)
      const education = defaultsDeep({
        id: null,
        text: ed
      })
      this.educationService.addEducation(education).subscribe(education => console.log(education));
    })


    const cv = defaultsDeep({
      id: null,
      user: ngForm.form.value.user,
      education: '2',
      experience: ngForm.form.value.experience,
      skills: ngForm.form.value.skills,
      languages: ngForm.form.value.languages,
      activities: ngForm.form.value.activities,
      fb: ngForm.form.value.fb,
      git: ngForm.form.value.git,
      linkedin: ngForm.form.value.linkedin
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
