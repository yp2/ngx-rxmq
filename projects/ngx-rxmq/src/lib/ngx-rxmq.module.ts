import { Inject, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { RxmqService } from './rxmq.service';
import { NGX_MQ_FEATURE_CONSUMERS, NGX_MQ_ROOT_CONSUMERS } from './inject';
import { MQable } from './contracts';

@NgModule({
  imports: [],
})
export class NgxRxmqModule {
  static forRoot(consumers: Type<MQable>[] = []): ModuleWithProviders {
    return {
      ngModule: NgxRxmqRootModule,
      providers: [
        RxmqService,
        consumers,
        {
          provide: NGX_MQ_ROOT_CONSUMERS,
          deps: consumers,
          useFactory: getConsumerInstances
        }
      ]
    };
  }

  static forFeature(consumers: Type<MQable>[] = []): ModuleWithProviders {
    return {
      ngModule: NgxRxmqFeatureModule,
      providers: [
        consumers,
        {
          provide: NGX_MQ_FEATURE_CONSUMERS,
          multi: true,
          deps: consumers,
          useFactory: getConsumerInstances,
        }
      ]
    };
  }
}


@NgModule({})
export class NgxRxmqRootModule {
  constructor(private mqService: RxmqService, @Inject(NGX_MQ_ROOT_CONSUMERS) private consumers: MQable[] = []) {
    connectConsumers(consumers, mqService);
  }
}

@NgModule({})
export class NgxRxmqFeatureModule {
  constructor(private mqService: RxmqService, @Inject(NGX_MQ_FEATURE_CONSUMERS) private consumerGroups: MQable[][] = []) {
    consumerGroups.forEach((group: MQable[]) => {
      connectConsumers(group, mqService);
    });
  }
}

export function getConsumerInstances(...instances: any[]) {
  return instances;
}

export function connectConsumers(consumers: MQable[], mqService: RxmqService) {
  consumers.forEach((consumer) => {
    if (consumer.connect) {
      consumer.connect(mqService);
    }
  });
}
