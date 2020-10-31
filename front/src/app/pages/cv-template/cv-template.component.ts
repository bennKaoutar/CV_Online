import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {defaultsDeep} from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {CvService} from '../../services/cv.service';
import {Cv} from '../../models/cv.model';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {HttpClient} from "@angular/common/http";

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
    selectedFile;
    event1;
    imgURL: any;
    receivedImageData: any;
    base64Data: any;
    convertedImage: any;
    /*url;
    msg = "";*/
    msg: string;

    constructor(private cvService: CvService, private authService: AuthService, private router: Router,
                private route: ActivatedRoute, private httpClient: HttpClient) {}

    ngOnInit(): void {
        this.user = this.authService.getCurrentUser();
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

    onUpload() {

        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);


        this.httpClient.post('http://localhost:8080/check/upload', uploadData).subscribe()
        this.httpClient.get('http://localhost:8080/check/image/8')
            .subscribe(
                res => {
                    console.log(res);
                    this.receivedImageData = res;
                    this.base64Data = this.receivedImageData.pic;
                    this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
                },
                err => console.log('Error Occured during saving: ' + err)
            );
    }

}
