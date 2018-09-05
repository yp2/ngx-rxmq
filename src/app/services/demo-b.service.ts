import { Injectable } from '@angular/core';
import { RxmqService } from '../../../projects/ngx-rxmq/src/lib/rxmq.service';
import { MQable } from '../../../projects/ngx-rxmq/src/lib/contracts';

@Injectable({
  providedIn: 'root'
})
export class DemoBService implements MQable {

  constructor(private mq: RxmqService) { }

  connect(mq: RxmqService): void {
    mq.channel('demo-b').observe('add.element')
      .subscribe((event) => {
        console.log('demo-b:add.element', event);
      });
  }

  emit() {
    this.mq.channel('demo-a').subject('add.element').next({message: 'added element to demo-a'});
  }
}
