import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureAComponent } from './feature-a/feature-a.component';
import { FeatureARoutingModule } from './feature-a-routing.module';
import { NgxRxmqModule } from '../../../projects/ngx-rxmq/src/lib/ngx-rxmq.module';
import { FeatureAService } from './services/feature-a.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { DemoAComponent } from '../demo-a/demo-a.component';

@NgModule({
  imports: [
    CommonModule,
    FeatureARoutingModule,
    NgxRxmqModule.forFeature([FeatureAService]),
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  declarations: [FeatureAComponent]
})
export class FeatureAModule { }
