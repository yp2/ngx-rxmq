import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureBComponent } from './feature-b/feature-b.component';
import { FeatureBRoutingModule } from './feature-b-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FeatureBRoutingModule
  ],
  declarations: [FeatureBComponent]
})
export class FeatureBModule { }
