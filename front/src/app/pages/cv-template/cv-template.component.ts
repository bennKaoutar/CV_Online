import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {defaultsDeep} from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {CvService} from '../../services/cv.service';
import {Cv} from '../../models/cv.model';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';

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

  cv: Cv;
  user: User;

  constructor(private cvService: CvService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user =  this.authService.getCurrentUser();
    this.route.data.subscribe((data: { cv: Cv }) => this.cv = data.cv);
    this.myuser = this.user.firstName + ' ' + this.user.lastName;
    this.myeducation = this.cv.education;
    this.myexperience = this.cv.experience;
    this.myskills = this.cv.skills;
    this.mylanguages = this.cv.languages;
    this.myactivities = this.cv.activities;
  }

  onSubmit(ngForm: NgForm) {
    const cv = defaultsDeep({
      id: this.cv.id,
      user: ngForm.form.value.user,
      education: ngForm.form.value.education,
      experience: ngForm.form.value.experience,
      skills: ngForm.form.value.skills,
      languages: ngForm.form.value.languages,
      activities: ngForm.form.value.activities,
      fb: ngForm.form.value.fb,
      git: ngForm.form.value.git,
      linkedin: ngForm.form.value.linkedin
    });

    this.cvService.addCv(cv).subscribe(cv => console.log(cv));
    this.router.navigateByUrl(`/cv-view/${cv.id}`)
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
