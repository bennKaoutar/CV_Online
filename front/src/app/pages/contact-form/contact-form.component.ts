import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {MailService} from '../../services/mail.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  name: any;
  email: any;
  subject: any;
  message: any;

  constructor(public dialogRef: MatDialogRef<ContactFormComponent>, private mailService: MailService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(ngForm: NgForm) {
    const mail = defaultsDeep({
      nameSender: ngForm.form.value.name,
      emailSender: ngForm.form.value.email,
      subject: ngForm.form.value.subject,
      message: ngForm.form.value.message,
    });
    console.log('enter form');
    this.mailService.sendMail(mail).subscribe(mail => console.log(mail));
  }
}
