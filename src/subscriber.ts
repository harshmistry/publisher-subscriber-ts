import { v4 as uuidv4 } from 'uuid';

export class Subscriber {
  private _callBack: (...args: any[]) => void;
  private _id: string;

  constructor(callBack: (...args: any[]) => void) {
    this._callBack = callBack;
    this._id = uuidv4();
  }

  get callBack(): (...args: any[]) => void {
    return this._callBack;
  }

  get id(): string {
    return this._id;
  }
}
