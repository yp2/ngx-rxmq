import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureBComponent } from './feature-b/feature-b.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureBComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureBRoutingModule { }
