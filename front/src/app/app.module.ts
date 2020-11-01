import {MatDialogModule} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './pages/home/home.component';
import {ListUsersComponent} from './pages/list-users/list-users.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {CvTemplateComponent} from './pages/cv-template/cv-template.component';
import {CvViewComponent} from './pages/cv-view/cv-view.component';
import {ContactFormComponent} from './pages/contact-form/contact-form.component';
import {ListCvsComponent} from './pages/list-cvs/list-cvs.component';
import {LoginUserComponent} from './pages/login-user/login-user.component';
import { ExportDataComponent } from './pages/export-data/export-data.component';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';

@NgModule({
    declarations: [
        AppComponent,
        ListUsersComponent,
        AddUserComponent,
        CvTemplateComponent,
        HomeComponent,
        CvViewComponent,
        ListCvsComponent,
        LoginUserComponent,
        ContactFormComponent,
        ExportDataComponent,
        ColorPickerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatRadioModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
