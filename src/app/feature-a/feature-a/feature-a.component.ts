import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxmqService } from '../../../../projects/ngx-rxmq/src/lib/rxmq.service';
import { Channel } from '../../../../projects/ngx-rxmq/src/lib/contracts';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-feature-a',
  templateUrl: './feature-a.component.html',
  styleUrls: ['./feature-a.component.css']
})
export class FeatureAComponent implements OnInit {

  public readonly form: FormGroup;
  private demoAChanel: Channel<{}>;
  private demoBChanel;

  constructor(private formBuilder: FormBuilder, private mq: RxmqService) {
    this.form = formBuilder.group({
      messageDemoA: [''],
      messageDemoB: [''],
    });

    this.demoAChanel = this.mq.channel('demo-a');
    this.demoBChanel = this.mq.channel('demo-b');
  }

  ngOnInit() {
    this.demoAChanel.observe('add.element')
      .pipe(
        map(e => e['message']),
        filter((message) => {
          return this.form.get('messageDemoA').value !== message;
        })
      )
      .subscribe((message) => {
        console.log('sub', message);
        this.form.patchValue({
          messageDemoA: message
        });
      });
  }

  sendDemoA() {
    this.demoAChanel.subject('add.element').next({message: this.form.get('messageDemoA').value});
  }

  sendDemoB() {
    this.demoBChanel.subject('add.element').next({message: this.form.get('messageDemoB').value});
  }


}
