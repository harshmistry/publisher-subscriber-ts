import { Subscriber } from '../subscriber';

let subscriber: Subscriber;
const callBack = () => {};
const topicName = 'Topic 1';

beforeEach(() => {
  subscriber = new Subscriber(callBack, topicName);
});

test('Subscriber callback', () => {
  expect(subscriber.callBack).toBe(callBack);
});

test('Subscriber ID', () => {
  expect(subscriber.id).not.toBeNull();
});

test('Subscriber topic name', () => {
  expect(subscriber.topicName).toBe(topicName);
});
