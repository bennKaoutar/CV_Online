import { ContactComponent } from './pages/contact/contact.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { CvTemplateComponent } from './pages/cv-template/cv-template.component';
import { CvViewComponent } from './pages/cv-view/cv-view.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListUsersComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'cv-template', component: CvTemplateComponent },
  { path: 'cv-view/:id', component: CvViewComponent },
  {path:'inscription', component:InscriptionComponent},
  {path:'contact/:id',component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
