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
        this.route.data.subscribe((data: { cv: Cv }) => {
            this.cv = data.cv;
        });

        this.userService.getUserFromCv(this.cv.id).subscribe(user => {
            this.user = user[0];
            if (this.user.idImage != null) {
                this.imageService.getImage(this.user.idImage)
                    .subscribe(
                        res => {
                            this.receivedImageData = res;
                            this.base64Data = this.receivedImageData.pic;
                            this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
                        },
                        err => console.log('Error Occured during getting the picture : ' + err)
                    );
            }
            if (this.user.idCustom != null) {
                this.customService.getCustom(this.user.idCustom)
                    .subscribe(
                        custom => {
                            this.bannerColor = custom.banner;
                            this.titlesColor = custom.titles;
                        }
                    )
            }
        })
    }


    openDialog(): void {
        const dialogRef = this.dialog.open(ContactFormComponent, {
            width: '600px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('send email');
        });
    }

    exportCV() {
        this.cvService.getCvFile(this.cv.id).subscribe(res => this.downloadFile(res, 'application/json'));
        console.log('fichier en cours d\'envoi');
    }

    downloadFile(data: string, type: string) {
        const blob = new Blob([JSON.stringify(data)], {type});
        const url = window.URL.createObjectURL(blob);
        const pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
            alert('Please disable your Pop-up blocker and try again.');
        }
    }
}
