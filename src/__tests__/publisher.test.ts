import { Publisher } from '../publisher';
import { SubscribeOption } from '../publisher.model';
import { Subscriber } from '../subscriber';

const callBack = (event: any) => {};

test('Create Topic', () => {
  const topicName = 'Topic 1';
  const topic1 = Publisher.createTopic(topicName);

  expect(topic1).not.toBeNull();
  expect(topic1.topicName).toBe(topicName);
});

test('Topic name not present while subscribing', () => {
  let option: SubscribeOption = { topicName: '' };
  try {
    expect(Publisher.subscribeTopic(option, callBack)).toThrowError(
      'Topic name cannot be empty or null while subscribing',
    );
  } catch (e) {}
});

test('Topic name not found while subscribing', () => {
  let option: SubscribeOption = { topicName: 'Topic not created yet' };
  try {
    expect(Publisher.subscribeTopic(option, callBack)).toThrowError(
      'Cannot find topic with name: ' + option.topicName + '. Please create one and then subscribe.',
    );
  } catch (e) {}
});

test('Topic subscription', () => {
  const topicName = 'Topic 1';
  const topic1 = Publisher.createTopic(topicName);
  expect(topic1.topicName).toBe(topicName);

  const option: SubscribeOption = { topicName: topicName };
  expect(Publisher.subscribeTopic(option, callBack)).toBeInstanceOf(Subscriber);
});

test('Topic name not found while unsubscribing', () => {
  let topicName = 'Topic not created yet';
  try {
    const sub = new Subscriber(callBack);
    expect(Publisher.unsubscribeTopic(topicName, sub)).toThrowError('Cannot find topic with name: ' + topicName);
  } catch (e) {}

  topicName = 'Topic 1';
  const topic1 = Publisher.createTopic(topicName);
  expect(topic1.topicName).toBe(topicName);

  const option: SubscribeOption = { topicName: topicName };
  const sub1 = Publisher.subscribeTopic(option, callBack);
  expect(sub1).toBeInstanceOf(Subscriber);

  expect(Publisher.unsubscribeTopic(topicName, sub1 as Subscriber)).toBeUndefined();
});
