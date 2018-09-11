import { connectConsumers, getConsumerInstances, NgxRxmqFeatureModule, NgxRxmqModule, NgxRxmqRootModule } from './ngx-rxmq.module';
import { MQable } from './contracts';
import { NGX_RXMQ_FEATURE_CONSUMERS, NGX_RXMQ_ROOT_CONSUMERS, RXMQ_INSTANCE } from './inject';
import { RxmqService } from './rxmq.service';
import Rxmq from 'rxmq';

describe('NgxRxmqModule all', () => {
  class ServiceOne implements MQable {
    connect = jasmine.createSpy('ServiceOne connect');
  }

  class ServiceTwo implements MQable {
    connect = jasmine.createSpy('ServiceTwo connect');
  }

  describe('NgxRxmqModule', () => {
    it('should create', () => {
      const module: NgxRxmqModule = new NgxRxmqModule();

      expect(module).toBeTruthy();
    });

    it('should return correct ModuleWithProviders definition on forRoot call', () => {
      const result = NgxRxmqModule.forRoot([ServiceOne, ServiceTwo]);

      expect(result).toEqual({
        ngModule: NgxRxmqRootModule,
        providers: [
          {provide: RXMQ_INSTANCE, useValue: Rxmq},
          RxmqService,
          [ServiceOne, ServiceTwo],
          {
            provide: NGX_RXMQ_ROOT_CONSUMERS,
            deps: [ServiceOne, ServiceTwo],
            useFactory: getConsumerInstances
          }
        ]
      });
    });

    it('should return correct ModuleWithProviders definition on forFeature call', () => {
      const result = NgxRxmqModule.forFeature([ServiceOne, ServiceTwo]);

      expect(result).toEqual({
        ngModule: NgxRxmqFeatureModule,
        providers: [
          [ServiceOne, ServiceTwo],
          {
            provide: NGX_RXMQ_FEATURE_CONSUMERS,
            multi: true,
            deps: [ServiceOne, ServiceTwo],
            useFactory: getConsumerInstances
          }
        ]
      });
    });

  });

  describe('NgxRxmqRootModule', () => {
    let rxmqService: RxmqService;
    let consumers: MQable[];

    beforeEach(() => {
      rxmqService = new RxmqService(Rxmq);
      consumers = [new ServiceOne(), new ServiceTwo()];
    });

    it('should create', () => {
      const module = new NgxRxmqRootModule(rxmqService, consumers);

      expect(module).toBeTruthy();
    });

    it('should call connect method of each consumers with RxmqService', () => {
      const module = new NgxRxmqRootModule(rxmqService, consumers);

      expect(consumers[0].connect).toHaveBeenCalledWith(rxmqService);
      expect(consumers[1].connect).toHaveBeenCalledWith(rxmqService);
    });
  });

  describe('NgxRxmqFeatureModule', () => {
    let rxmqService: RxmqService;
    let consumers: MQable[];

    beforeEach(() => {
      rxmqService = new RxmqService(Rxmq);
      consumers = [new ServiceOne(), new ServiceTwo()];
    });

    it('should create', () => {
      expect(new NgxRxmqFeatureModule(rxmqService, [consumers])).toBeTruthy();
    });

    it('should call connect method of each consumers with RxmqService', () => {
      const module = new NgxRxmqFeatureModule(rxmqService, [consumers]);

      expect(consumers[0].connect).toHaveBeenCalledWith(rxmqService);
      expect(consumers[1].connect).toHaveBeenCalledWith(rxmqService);
    });
  });

  describe('getConsumerInstances', () => {
    it('should return na array of passed args', () => {
      const result = getConsumerInstances(1, 2);

      expect(result).toEqual([1, 2]);
    });
  });

  describe('connectConsumers', () => {
    let rxmqService: RxmqService;
    let consumers: MQable[];

    beforeEach(() => {
      rxmqService = new RxmqService(Rxmq);
      consumers = [new ServiceOne(), new ServiceTwo()];
    });

    it('should call connect method ', () => {
      connectConsumers(consumers, rxmqService);

      expect(consumers[0].connect).toHaveBeenCalledWith(rxmqService);
      expect(consumers[1].connect).toHaveBeenCalledWith(rxmqService);
    });
  });
});
