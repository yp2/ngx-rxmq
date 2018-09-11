import { RxmqService } from './rxmq.service';
import { Channel, RequestResponseChannel,  } from 'rxmq';

export interface MQable {
  connect(mq: RxmqService): void;
}

export type ChannelType<T, R> = Channel<T> | RequestResponseChannel<T, R>;

export {Channel, RequestResponseChannel};
