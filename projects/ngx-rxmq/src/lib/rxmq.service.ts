import { Inject, Injectable } from '@angular/core';
import { Channel } from 'rxmq';
import { RequestResponseChannel } from 'rxmq';
import { RXMQ_INSTANCE } from './inject';

@Injectable({
  providedIn: 'root'
})
export class RxmqService {

  constructor(@Inject(RXMQ_INSTANCE) private readonly rxmq) {
  }

  channel<T>(name: string): Channel<T> {
    return <Channel<T>>this.rxmq.channel(name);
  }

  requestResponseChannel<T, R>(name: string): RequestResponseChannel<T, R> {
    return <RequestResponseChannel<T, R>>this.rxmq.channel(name);
  }

  registerPlugin(plugin: Object) {
    this.rxmq.registerPlugin(plugin);
  }

  registerChannelPlugin(plugin: Object) {
    this.rxmq.registerChannelPlugin(plugin);
  }
}
