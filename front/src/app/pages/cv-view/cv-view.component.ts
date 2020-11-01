import {Component, OnInit} from '@angular/core';
import {CvService} from '../../services/cv.service';
import {Cv} from '../../models/cv.model';
import {ActivatedRoute} from '@angular/router';
import {ImageService} from "../../services/image.service";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";

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

    constructor(private cvService: CvService, private route: ActivatedRoute,
                private authService: AuthService, private imageService: ImageService) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        const a = this.route.data.subscribe((data: { cv: Cv }) => {
            this.cv = data.cv;
            console.log(this.cv, 'this cv');
        });
        console.log(a, 'a');

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
}