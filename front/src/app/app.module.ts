import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material/material.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './pages/home/home.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {CvTemplateComponent} from './pages/cv-template/cv-template.component';
import {CvViewComponent} from './pages/cv-view/cv-view.component';
import {ContactFormComponent} from './pages/contact-form/contact-form.component';
import {LoginUserComponent} from './pages/login-user/login-user.component';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';

@NgModule({
    declarations: [
        AppComponent,
        AddUserComponent,
        CvTemplateComponent,
        HomeComponent,
        CvViewComponent,
        LoginUserComponent,
        ContactFormComponent,
        ColorPickerComponent,
        ListUsersComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
