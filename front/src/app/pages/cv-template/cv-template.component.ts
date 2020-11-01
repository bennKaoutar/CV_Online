import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {defaultsDeep} from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {CvService} from '../../services/cv.service';
import {Cv} from '../../models/cv.model';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Image} from "../../models/image.model";
import {ImageService} from "../../services/image.service";

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
    fb: any;
    git: any;
    linkedin: any;
    textAreasList: any = [];
    test: any;

    cv: Cv;
    user: User;
    image: Image;
    selectedFile;
    imgURL: any;
    receivedImageData: any;
    base64Data: any;
    msg: string;
    convertedImage: any;
    hidePicture: boolean;


    constructor(private cvService: CvService, private authService: AuthService, private userService: UserService,
                private imageService: ImageService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.user = this.authService.getCurrentUser();
        this.route.data.subscribe((data: { cv: Cv }) => this.cv = data.cv);
        this.myuser = this.user.firstName + ' ' + this.user.lastName;
        this.myeducation = this.cv.education;
        this.myexperience = this.cv.experience;
        this.myskills = this.cv.skills;
        this.mylanguages = this.cv.languages;
        this.myactivities = this.cv.activities;
        this.hidePicture = true;

        if(this.user.idImage != null){
            this.imageService.getImage(this.user.idImage)
                .subscribe(
                    res => {
                        this.receivedImageData = res;
                        this.base64Data = this.receivedImageData.pic;
                        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
                        this.hidePicture = false;
                    },
                    err => console.log('Error Occured during getting the picture : ' + err)
                );
        }
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

        if (this.selectedFile != null){
            const uploadData = new FormData();
            uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
            this.imageService.uploadImage(uploadData).subscribe( img => {
                this.image = img;
                this.userService.setPicture(this.user.id, this.image.id).subscribe( user => {
                    this.authService.setCurrentUser(user);
                    this.router.navigateByUrl(`/cv-view/${cv.id}`)
                });
            })
        } else {
            this.router.navigateByUrl(`/cv-view/${cv.id}`)
        }
    }

    addTextarea() {
        this.textAreasList.push('');
    }


    removeTextArea(index) {
        this.textAreasList.splice(index, 1);
    }

    trackByFn(index: any) {
        return index;
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];

        // dans le cas où l'image est enlevée
        if (!this.selectedFile || this.selectedFile.length === 0) {
            this.msg = 'You must select an image';
            this.imgURL = null;
            return;
        }

        // dans le cas où le fichier choisi n'est pas une image
        const mimeType = this.selectedFile.type;
        if (mimeType.match(/image\/*/) == null) {
            this.msg = 'Only images are supported';
            this.imgURL = null;
            return;
        }

        // dans le cas où le fichier sélectionné est bien une image
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
            this.msg = '';
            this.imgURL = reader.result;
        };
    }

}
