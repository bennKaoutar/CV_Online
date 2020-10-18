import { Component, OnInit } from '@angular/core';
import {CvService} from '../../services/cv.service';
import {Cv} from '../../models/cv.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {

  cv: Cv;

  constructor(private cvService: CvService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cvService.getCv(this.route.snapshot.params.id).subscribe(cv => this.cv = cv );
  }
}