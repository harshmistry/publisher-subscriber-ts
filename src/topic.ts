import { Subscriber } from './subscriber';
import { SubscribeOption } from './publisher.model';

/**
 * @author Harsh A. Mistry
 *
 * Topic class for creating new topic. Topic is a medium for communicating between publisher and subscriber. A publisher will create topic and subscriber will
 * subscribe to topic/topics
 */
export class Topic {
  private _subscriberList: Subscriber[];
  private _currentValue: any;
  private _topicName: string;

  constructor(topicName: string) {
    this._topicName = topicName;
    this._subscriberList = new Array<Subscriber>();
  }

  /**
   * Publish any event for current topic. Once event is published all active subscribers will get a notification in callback function.
   * @param {any} event
   */
  publish(event: any) {
    this._currentValue = event;
    for (const subscriber of this._subscriberList) {
      this.emitValueToSubscriber(subscriber);
    }
  }

  /**
   * Once topic is created, it can be subscribed using this method
   * @param {Function} callback
   * @param {SubscribeOption} option Different option can be passed while subscribing.
   *  e.g. If topic has already emitted some value and then a subscriber comes, then it can pass option to re-emit last emitted value only for this new subscriber.
   *
   * @returns {Subscriber} Final subscriber object once successfully subscribed
   */
  subscribe(callback: (...args: any[]) => void, option: SubscribeOption): Subscriber {
    const subscriber = new Subscriber(callback);
    if (option.getLastValue && this._currentValue) {
      this.emitValueToSubscriber(subscriber);
    }
    this._subscriberList.push(subscriber);
    return subscriber;
  }

  /**
   * Method to unsubscribe/remove a listener of this topic
   * @param {Subscriber} subscription Subscriber of this topic
   */
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

  /**
   * Returns topic name
   *
   * @returns {string}
   */
  get topicName(): string {
    return this._topicName;
  }

  /**
   * Broadcast value to given subscriber
   * @param {Subscriber} subscriber
   */
  private emitValueToSubscriber(subscriber: Subscriber) {
    if (this._currentValue) {
      subscriber.callBack.call(this, this._currentValue);
    }
  }
}
