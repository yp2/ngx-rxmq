import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureAComponent } from './feature-a/feature-a.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureAComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureARoutingModule { }
