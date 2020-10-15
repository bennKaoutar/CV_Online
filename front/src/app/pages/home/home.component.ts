import { Component, OnInit } from '@angular/core';
import {Cv} from '../../models/cv.model';
import {CvService} from '../../services/cv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cvs: Cv[];

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getCvs().subscribe(cvs => this.cvs = cvs);
  }

}
