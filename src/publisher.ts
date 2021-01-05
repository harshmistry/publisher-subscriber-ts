import { Topic } from './topic';
import { Subscriber } from './subscriber';
import { SubscribeOption } from './publisher.model';

/**
 * @author Harsh A. Mistry
 * 
 * Publisher class to publish new topics and emit values
 */
export class Publisher {
  private static _topicMap: Map<string, Topic> = new Map<string, Topic>();

  /**
   * Creates new topic for given topic name
   * @param {string} topicName Name for topic to be created
   * 
   * @returns {Topic} New created topic
   */
  public static createTopic(topicName: string): Topic {
    const topic = new Topic(topicName);
    this._topicMap.set(topicName, topic);
    return topic;
  }

  /**
   * Subscribe to a particular topic by providing option and a callback function.
   * @param {SubscribeOption} option 
   * @param {Function} callback 
   * @throws {Topic name cannot be empty or null while subscribing} Error if topic name passed is null or empty
   * @throws {'Cannot find topic with name: ' ${topic_name} '. Please create one and then subscribe.'} If given topic name does not exist
   * 
   * @returns {Subscriber}
   */
  public static subscribeTopic(option: SubscribeOption, callback: (...args: any[]) => void): Subscriber | undefined {
    if (!option.topicName) {
      throw new Error('Topic name cannot be empty or null while subscribing');
    } else if (!this._topicMap.has(option.topicName)) {
      throw new Error('Cannot find topic with name: ' + option.topicName + '. Please create one and then subscribe.');
    } else if (this._topicMap) {
      return this._topicMap?.get(option.topicName)?.subscribe(callback, option);
    }
  }

  /**
   * Unsubscribe any topic for given subscriber
   * @param {string} topicName 
   * @param {Subscriber} subscriber Subscriber of this topic
   */
  public static unsubscribeTopic(topicName: string, subscriber: Subscriber) {
    if (!this._topicMap.has(topicName)) {
      throw new Error('Cannot find topic with name: ' + topicName);
    } else {
      this._topicMap?.get(topicName)?.unsubscribe(subscriber);
    }
  }
}
