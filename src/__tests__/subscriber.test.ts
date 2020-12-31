import { Subscriber } from '../subscriber';

let subscriber: Subscriber;
const callBack = () => {};

beforeEach(() => {
  subscriber = new Subscriber(callBack);
});

test('Subscriber callback', () => {
  expect(subscriber.callBack).toBe(callBack);
});

test('Subscriber ID', () => {
  expect(subscriber.id).not.toBeNull();
});
