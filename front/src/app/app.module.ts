import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { CvTemplateComponent } from './pages/cv-template/cv-template.component';
import { CvViewComponent } from './pages/cv-view/cv-view.component';
import { ContactComponent } from './pages/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    AddUserComponent,
    CvTemplateComponent,
    HomeComponent,
    CvViewComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
