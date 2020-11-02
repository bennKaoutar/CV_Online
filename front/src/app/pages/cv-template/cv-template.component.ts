import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {defaultsDeep} from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {CvService} from '../../services/cv.service';
import {Cv} from '../../models/cv.model';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Image} from '../../models/image.model';
import {ImageService} from '../../services/image.service';
import {CustomService} from '../../services/custom.service';

@Component({
    selector: 'app-cv-template',
    templateUrl: './cv-template.component.html',
    styleUrls: ['./cv-template.component.css']
})
export class CvTemplateComponent implements OnInit {

    // ngModels used in the form
    myuser: any;
    myemail: any;
    myeducation: any;
    myexperience: any;
    myskills: any;
    mylanguages: any;
    myactivities: any;
    fb: any;
    git: any;
    linkedin: any;

    textAreasList: any = [];

    cv: Cv;
    user: User;
    image: Image;

    // variables to select and upload the profile picture
    selectedFile;
    imgURL: any;
    receivedImageData: any;
    base64Data: any;
    msg: string; // error message during selection
    convertedImage: any;
    hidePicture: boolean;

    bannerColor: any;
    titlesColor: any;

    constructor(private cvService: CvService, private authService: AuthService, private userService: UserService,
                private imageService: ImageService, private customService: CustomService, private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.user = this.authService.getCurrentUser();

        // get the CV's data
        this.route.data.subscribe((data: { cv: Cv }) => this.cv = data.cv);
        // set inputs with the existing data
        this.myuser = this.user.firstName + ' ' + this.user.lastName;
        this.myemail = this.user.email;
        this.myeducation = this.cv.education;
        this.myexperience = this.cv.experience;
        this.myskills = this.cv.skills;
        this.mylanguages = this.cv.languages;
        this.myactivities = this.cv.activities;
        this.hidePicture = true;

        // if the user has customs, then show them
        if (this.user.idCustom != null) {
            this.customService.getCustom(this.user.idCustom)
                .subscribe(
                    custom => {
                        this.bannerColor = custom.banner;
                        this.titlesColor = custom.titles;
                    }
                )
        // else, just show default color values (white for the banner and black for titles)
        } else {
            this.bannerColor = '#fff';
            this.titlesColor = '#000000';
        }

        // if the user has a profile picture, then show it
        if (this.user.idImage != null) {
            this.imageService.getImage(this.user.idImage)
                .subscribe(
                    res => {
                        this.receivedImageData = res;
                        this.base64Data = this.receivedImageData.pic;
                        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
                        this.hidePicture = false;
                    },
                    err => console.log('Error Occured while getting the picture : ' + err)
                );
        }
    }

    /**
     * Submit CV form
     */
    onSubmit(ngForm: NgForm) {
        // Modify email address
        const emailUser = defaultsDeep({
            id: this.user.id,
            email: this.user.email
        });
        this.userService.setEmail(emailUser);

        // Modify CV
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

        // get custom data
        const custom = defaultsDeep({
            banner: this.bannerColor,
            titles: this.titlesColor
        });
        // add custom data, set id_custom into users table, refresh of the currentUser
        this.customService.setCustom(custom).subscribe(custom => {
            this.userService.setCustom(this.user.id, custom.id).subscribe(user =>
                this.authService.setCurrentUser(user))
        });

        // get profile picture
        if (this.selectedFile != null) {
            const uploadData = new FormData();
            uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
            // add picture, set id_image into users table, refresh of the currentUser
            this.imageService.uploadImage(uploadData).subscribe(img => {
                this.image = img;
                this.userService.setPicture(this.user.id, this.image.id).subscribe(user => {
                    this.authService.setCurrentUser(user);
                    this.router.navigateByUrl(`/cv-view/${cv.id}`)
                });
            })
        } else {
            this.router.navigateByUrl(`/cv-view/${cv.id}`)
        }
    }

    /**
     * Add text area when button add is clicked
     */
    addTextarea() {
        this.textAreasList.push('');
    }

    /**
     * Remove text area when button remove is clicked
     */
    removeTextArea(index) {
        this.textAreasList.splice(index, 1);
    }

    /**
     * To keep focus in the added txt area
     */
    trackByFn(index: any) {
        return index;
    }

    /**
     * Get selected file
     */
    onFileChanged(event) {
        this.selectedFile = event.target.files[0];

        // reset of the image view if none is selected
        if (!this.selectedFile || this.selectedFile.length === 0) {
            this.imgURL = null;
            return;
        }

        // if the file is not an image
        const mimeType = this.selectedFile.type;
        if (mimeType.match(/image\/*/) == null) {
            this.msg = 'Only images are supported';
            this.imgURL = null;
            return;
        }

        // show image in the CV view
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
            this.msg = '';
            this.imgURL = reader.result;
        };
    }

    /**
     * Change colors "in live" in the CV view
     */
    public setColor(type: string, color: string) {
        switch (type) {
            case 'banner':
                this.bannerColor = color;
                break;
            case 'titles':
                this.titlesColor = color;
                break;
            default:
                break;
        }
    }

}
