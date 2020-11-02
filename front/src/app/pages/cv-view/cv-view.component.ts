import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {CvService} from '../../services/cv.service';
import {Cv} from '../../models/cv.model';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ContactFormComponent} from '../contact-form/contact-form.component';
import {ImageService} from '../../services/image.service';
import {UserService} from '../../services/user.service';
import {CustomService} from '../../services/custom.service';

export interface UserData {
    emailCv: string;
}

@Component({
    selector: 'app-cv-view',
    templateUrl: './cv-view.component.html',
    styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {

    cv: Cv;
    user: User;
    receivedImageData: any;
    base64Data: any;
    convertedImage: any;

    bannerColor: any;
    titlesColor: any;


    constructor(private cvService: CvService, private route: ActivatedRoute,
                private authService: AuthService, private imageService: ImageService,
                private userService: UserService, private customService: CustomService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        // Resolver to wait for the CV data
        this.route.data.subscribe((data: { cv: Cv }) => {
            this.cv = data.cv;
        });
        // Resolver to wait for the CV's owner data
        this.route.data.subscribe((data: { user: User }) => {
            this.user = data.user[0];
        });

        // Get the CV's owner data
        if (this.user.idImage != null) {
            this.imageService.getImage(this.user.idImage)
                .subscribe(
                    res => {
                        this.receivedImageData = res;
                        this.base64Data = this.receivedImageData.pic;
                        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
                    },
                    err => console.log('Error Occured while getting the picture : ' + err)
                );
        }
        // if the owner has customs, then display them
        if (this.user.idCustom != null) {
            this.customService.getCustom(this.user.idCustom)
                .subscribe(
                    custom => {
                        this.bannerColor = custom.banner;
                        this.titlesColor = custom.titles;
                    }
                )
        }
    }

    /**
     * Open DialogBox - contact form
     */
    openDialog(): void {
        const dialogRef = this.dialog.open(ContactFormComponent, {
            width: '600px',
            data: {emailCv: this.user.email}
        });

        dialogRef.afterClosed().subscribe();
    }

    /**
     * Get CV's data
     */
    exportCV() {
        this.cvService.getCv(this.cv.id).subscribe(res => {
            this.downloadFile(res, 'application/json');
        })
    }

    /**
     * Download file with JSON - CV_PrenomNOM.txt
     */
    downloadFile(data: string, type: string) {
        const blob = new Blob([JSON.stringify(data)], {type});
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV_' + this.user.firstName + this.user.lastName + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}
