import { Component, OnInit } from '@angular/core';
import { RxmqService } from '../../../projects/ngx-rxmq/src/lib/rxmq.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-demo-a',
  templateUrl: './demo-a.component.html',
  styleUrls: ['./demo-a.component.css']
})
export class DemoAComponent implements OnInit {

  message$: Observable<string>;

  constructor(private mq: RxmqService) { }

  ngOnInit() {
    this.message$ = this.mq.channel<{message: string}>('demo-a').observe('add.element')
      .pipe(map(event => event.message));
  }

  emitB() {
    this.mq.channel('demo-b').subject('add.element').next({message: 'Added element to demo-b'});
  }

  emitA() {
    this.mq.channel('demo-a').subject('add.element').next({message: 'Added element to demo-a'});
  }
}
