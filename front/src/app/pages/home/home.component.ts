import { Component, OnInit } from '@angular/core';
import {Cv} from '../../models/cv.model';
import {CvService} from '../../services/cv.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cvs: Cv[];
  cv: Cv;

  constructor(private cvService: CvService, private router: Router) { }

  ngOnInit(): void {
    this.cvService.getCvs().subscribe(cvs => this.cvs = cvs);
  }

  goToCvView(id: number){
    this.router.navigateByUrl(`/cv-view/${id}`);
  }

}
