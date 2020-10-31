import { User } from './../../models/user.model';
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
  imageUrl: string = "";
  fileToUpload: File = null;
  myimage: File;
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

  constructor(private cvService: CvService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
    const cv = defaultsDeep({
      id: null,
      image: ngForm.form.value.image,
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
    this.router.navigateByUrl('/')
  }
  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0]
  // }

  // handleFileInput(file: FileList){
  //   this.selectedFile=file.item(0);

  //   var reader = new FileReader();
  //   reader.onload=(event:any)=>{
  //     this.myimage=event.target.result;
  //   }
  //   reader.readAsDataURL(this.selectedFile);
  // }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
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
