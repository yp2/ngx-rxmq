import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxRxmqModule } from '../../projects/ngx-rxmq/src/lib/ngx-rxmq.module';
import { DemoAService } from './services/demo-a.service';
import { DemoBService } from './services/demo-b.service';
import { DemoAComponent } from './demo-a/demo-a.component';
import { DemoBComponent } from './demo-b/demo-b.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { StartComponent } from './start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DemoAComponent,
    DemoBComponent,
    NotFoundComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
    NgxRxmqModule.forRoot([DemoAService, DemoBService])
  ],
  providers: [
    DemoAService,
    DemoBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
