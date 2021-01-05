import { v4 as uuidv4 } from 'uuid';

/**
 * @author Harsh A. Mistry
 *
 * Subscriber class to start listening to any topic
 */
export class Subscriber {
  private _callBack: (...args: any[]) => void;
  private _id: string;
  private _topicName: string;

  constructor(callBack: (...args: any[]) => void, topicName: string) {
    this._callBack = callBack;
    this._id = uuidv4();
    this._topicName = topicName;
  }

  /**
   * Getter for callback
   *
   * @returns {Function} callback function provided while subscribing
   */
  get callBack(): (...args: any[]) => void {
    return this._callBack;
  }

  /**
   * Getter for subscrber ID. Used for unsubscription.
   *
   * @returns {string} subscription ID
   */
  get id(): string {
    return this._id;
  }

  /**
   * Getter for topic name. Used for unsubscription.
   *
   * @returns {string} topic name
   */
  get topicName(): string {
    return this._topicName;
  }
}
