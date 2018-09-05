import { Injectable } from '@angular/core';
import { MQable } from '../../../projects/ngx-rxmq/src/lib/contracts';
import { RxmqService } from '../../../projects/ngx-rxmq/src/lib/rxmq.service';

@Injectable({
  providedIn: 'root'
})
export class DemoAService implements MQable {

  constructor(private mq: RxmqService) { }

  connect(mq: RxmqService): void {
    mq.channel<{message: string}>('demo-a').observe('add.element')
      .subscribe((event) => {
        console.log('demo-a:add.element', event);
      });
  }

  emit() {
    this.mq.channel<{message: string}>('demo-b').subject('add.element').next({message: 'added element to demo-b'});
  }
}
