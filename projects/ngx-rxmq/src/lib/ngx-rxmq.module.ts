import { Inject, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { RxmqService } from './rxmq.service';
import { NGX_RXMQ_FEATURE_CONSUMERS, NGX_RXMQ_ROOT_CONSUMERS, RXMQ_INSTANCE } from './inject';
import { MQable } from './contracts';
import Rxmq from 'rxmq';

@NgModule({})
export class NgxRxmqRootModule {
  constructor(private mqService: RxmqService, @Inject(NGX_RXMQ_ROOT_CONSUMERS) private consumers: MQable[] = []) {
    connectConsumers(consumers, mqService);
  }
}

@NgModule({})
export class NgxRxmqFeatureModule {
  constructor(private mqService: RxmqService, @Inject(NGX_RXMQ_FEATURE_CONSUMERS) private consumerGroups: MQable[][] = []) {
    consumerGroups.forEach((group: MQable[]) => {
      connectConsumers(group, mqService);
    });
  }
}

@NgModule({})
export class NgxRxmqModule {
  static forRoot(consumers: Type<MQable>[] = []): ModuleWithProviders {
    return {
      ngModule: NgxRxmqRootModule,
      providers: [
        {provide: RXMQ_INSTANCE, useValue: Rxmq},
        RxmqService,
        consumers,
        {
          provide: NGX_RXMQ_ROOT_CONSUMERS,
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
          provide: NGX_RXMQ_FEATURE_CONSUMERS,
          multi: true,
          deps: consumers,
          useFactory: getConsumerInstances
        }
      ]
    };
  }
}

export function getConsumerInstances(...instances: any[]) {
  return instances;
}

export function connectConsumers(consumers: MQable[], mqService: RxmqService) {
  consumers.forEach((consumer) => {
    consumer.connect(mqService);
  });
}
