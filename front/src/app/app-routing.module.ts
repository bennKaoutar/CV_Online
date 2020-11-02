import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {CvTemplateComponent} from './pages/cv-template/cv-template.component';
import {CvViewComponent} from './pages/cv-view/cv-view.component';
import {CvResolver} from './resolvers/cv.resolver';
import {CvViewResolver} from './resolvers/cv-view.resolver';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'add-user', component: AddUserComponent},
    {
        path: 'cv-template',
        component: CvTemplateComponent,
        resolve: {
            cv: CvResolver
        }
    },
    {
        path: 'cv-view/:id',
        component: CvViewComponent,
        resolve: {
            cv: CvViewResolver
        }
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
