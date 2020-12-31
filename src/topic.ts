import { Subscriber } from './subscriber';
import { SubscribeOption } from './publisher.model';

export class Topic {
  private _subscriberList: Subscriber[];
  private _currentValue: any;
  private _topicName: string;

  constructor(topicName: string) {
    this._topicName = topicName;
    this._subscriberList = new Array<Subscriber>();
  }

  publish(event: any) {
    this._currentValue = event;
    for (const subscriber of this._subscriberList) {
      this.emitValueToSubscriber(subscriber);
    }
  }

  subscribe(callback: (...args: any[]) => void, option: SubscribeOption): Subscriber {
    const subscriber = new Subscriber(callback);
    if (option.getLastValue && this._currentValue) {
      this.emitValueToSubscriber(subscriber);
    }
    this._subscriberList.push(subscriber);
    return subscriber;
  }

  unsubscribe(subscription: Subscriber) {
    if (subscription && subscription.id) {
      const removeAtIndex: number = this._subscriberList.findIndex((subscriber: Subscriber) => {
        return subscriber.id === subscription.id;
      });
      if (removeAtIndex > -1) {
        this._subscriberList.splice(removeAtIndex, 1);
      }
    }
  }

  get topicName(): string {
    return this._topicName;
  }

  private emitValueToSubscriber(subscriber: Subscriber) {
    if (this._currentValue) {
      subscriber.callBack.call(this, this._currentValue);
    }
  }
}
