import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    pathMatch: 'full',
  },
  {
    path: 'featurea',
    loadChildren: './feature-a/feature-a.module#FeatureAModule'
  },
  {
    path: 'featureb',
    loadChildren: './feature-b/feature-b.module#FeatureBModule'
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
