import { Topic } from './topic';
import { Subscriber } from './subscriber';
import { SubscribeOption } from './publisher.model';

export class Publisher {
  private static _topicMap: Map<string, Topic> = new Map<string, Topic>();

  public static createTopic(topicName: string): Topic {
    const topic = new Topic(topicName);
    this._topicMap.set(topicName, topic);
    return topic;
  }

  public static subscribeTopic(option: SubscribeOption, callback: (...args: any[]) => void): Subscriber | undefined {
    if (!option.topicName) {
      throw new Error('Topic name cannot be empty or null while subscribing');
    } else if (!this._topicMap.has(option.topicName)) {
      throw new Error('Cannot find topic with name: ' + option.topicName + '. Please create one and then subscribe.');
    } else if (this._topicMap) {
      return this._topicMap?.get(option.topicName)?.subscribe(callback, option);
    }
  }

  public static unsubscribeTopic(topicName: string, subscriber: Subscriber) {
    if (!this._topicMap.has(topicName)) {
      throw new Error('Cannot find topic with name: ' + topicName);
    } else {
      this._topicMap?.get(topicName)?.unsubscribe(subscriber);
    }
  }
}
