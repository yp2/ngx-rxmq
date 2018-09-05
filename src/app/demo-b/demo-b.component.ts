import { Component, OnInit } from '@angular/core';
import { RxmqService } from '../../../projects/ngx-rxmq/src/lib/rxmq.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-demo-b',
  templateUrl: './demo-b.component.html',
  styleUrls: ['./demo-b.component.css']
})
export class DemoBComponent implements OnInit {

  message$: Observable<string>;

  constructor(private mq: RxmqService) { }

  ngOnInit() {
    this.message$ = this.mq.channel('demo-b').observe('add.element')
      .pipe(
        map(e => e['message'])
      );
  }

  emitB() {
    this.mq.channel('demo-b').subject('add.element').next({message: 'Added element to demo-b'});
  }

  emitA() {
    this.mq.channel('demo-a').subject('add.element').next({message: 'Added element to demo-a'});
  }

}
