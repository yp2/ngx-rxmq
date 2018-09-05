import { Injectable } from '@angular/core';
import Rxmq, { Channel } from 'rxmq';
import { ChannelType } from './contracts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxmqService {

  private readonly rxmq = Rxmq;

  constructor() {
    console.log('instance RxmqService');
  }

  channel<T>(name: string): Channel<T> {
    return <Channel<T>>this.rxmq.channel(name);
  }

  registerPlugin(plugin: Object) {
    this.rxmq.registerPlugin(plugin);
  }

  registerChannelPlugin(plugin: Object) {
    this.rxmq.registerChannelPlugin(plugin);
  }
}