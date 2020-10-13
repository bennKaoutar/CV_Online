import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUsersComponent} from './pages/list-users/list-users.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {InscriptionComponent} from './pages/inscription/inscription.component';


const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'list', component: ListUsersComponent },
  { path: 'add-user', component: AddUserComponent },
  {path: 'inscription', component:InscriptionComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
