import { TestBed, getTestBed } from '@angular/core/testing';
import { RxmqService } from './rxmq.service';
import { RXMQ_INSTANCE } from './inject';

describe('RxmqService', () => {
  let service: RxmqService;
  const rxmqStub = {
    channel: jasmine.createSpy('channel'),
    registerPlugin: jasmine.createSpy('registerPlugin'),
    registerChannelPlugin: jasmine.createSpy('registerChannelPlugin'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RxmqService,
        {provide: RXMQ_INSTANCE, useValue: rxmqStub}
      ]
    });
    const injector = getTestBed();
    service = injector.get(RxmqService);
  });

  afterEach(() => {
    rxmqStub.channel.calls.reset();
    rxmqStub.registerPlugin.calls.reset();
    rxmqStub.registerChannelPlugin.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call rxmq.channel on channel call', () => {
    service.channel('test');

    expect(rxmqStub.channel).toHaveBeenCalledWith('test');
    expect(rxmqStub.channel).toHaveBeenCalledTimes(1);
    expect(rxmqStub.registerPlugin).not.toHaveBeenCalled();
    expect(rxmqStub.registerChannelPlugin).not.toHaveBeenCalled();
  });

  it('should call rxmq.channel on requestResponseChannel call', () => {
    service.requestResponseChannel('test');

    expect(rxmqStub.channel).toHaveBeenCalledWith('test');
    expect(rxmqStub.channel).toHaveBeenCalledTimes(1);
    expect(rxmqStub.registerPlugin).not.toHaveBeenCalled();
    expect(rxmqStub.registerChannelPlugin).not.toHaveBeenCalled();
  });

  it('should call rxmq.registerPlugin on registerPlugin call', () => {
    const plugin = {
      method: () => {}
    };

    service.registerPlugin(plugin);

    expect(rxmqStub.registerPlugin).toHaveBeenCalledWith(plugin);
    expect(rxmqStub.registerPlugin).toHaveBeenCalledTimes(1);
    expect(rxmqStub.channel).not.toHaveBeenCalled();
    expect(rxmqStub.registerChannelPlugin).not.toHaveBeenCalled();
  });

  it('should call rxmq.registerChannelPlugin on registerChannelPlugin call', () => {
    const plugin = {
      method: () => {}
    };

    service.registerChannelPlugin(plugin);

    expect(rxmqStub.registerChannelPlugin).toHaveBeenCalledWith(plugin);
    expect(rxmqStub.registerChannelPlugin).toHaveBeenCalledTimes(1);
    expect(rxmqStub.channel).not.toHaveBeenCalled();
    expect(rxmqStub.registerPlugin).not.toHaveBeenCalled();
  });
});
