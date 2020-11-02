import { Component, OnInit } from '@angular/core';
import {Cv} from '../../models/cv.model';
import {CvService} from '../../services/cv.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-cvs',
  templateUrl: './list-cvs.component.html',
  styleUrls: ['./list-cvs.component.css']
})
export class ListCvsComponent implements OnInit {

  cvs: Cv[];
  cv: Cv;

  constructor(private cvService: CvService, private router: Router) { }

  ngOnInit(): void {
    this.cvService.getCvs().subscribe(cvs => this.cvs = cvs); // display the CV of the users
  }

  /**
   * To navigate to CV View
   */
  goToCvView(id: number){
    this.router.navigateByUrl(`/cv-view/${id}`);
  }

}
