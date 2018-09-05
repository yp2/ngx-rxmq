import { Injectable } from '@angular/core';
import { MQable } from '../../../../projects/ngx-rxmq/src/lib/contracts';
import { RxmqService } from '../../../../projects/ngx-rxmq/src/lib/rxmq.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureAService implements MQable {

  constructor() { }

  connect(mq: RxmqService) {
    console.log('FeatureAService.connect', mq);
    mq.channel('demo-a').observe('add.element')
      .subscribe((event) => {
        console.log('Feature A service: demo-a:add.element', event);
      });
  }

}
