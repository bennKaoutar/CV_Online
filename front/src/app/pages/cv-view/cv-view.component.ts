import { Component, OnInit, Inject} from '@angular/core';
import {CvService} from '../../services/cv.service';
import {Cv} from '../../models/cv.model';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ContactFormComponent} from '../contact-form/contact-form.component';


@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {

  cv: Cv;

  constructor(private cvService: CvService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    const a = this.route.data.subscribe((data: { cv: Cv }) => {
      this.cv = data.cv;
      console.log(this.cv, 'this cv');
    });
    console.log(a, 'a');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '600px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('send email');
    });
  }
}
