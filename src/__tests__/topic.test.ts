import { Topic } from '../topic';

let topic: Topic;
const topicName = 'Topic1';

beforeEach(() => {
  topic = new Topic(topicName);
});

test('Topic Name', () => {
  expect(topic.topicName).toBe(topicName);
});

test('Subscribe to topic', () => {
  const emittedData = { data: 'Random Data' };
  const callBack = (event: any) => {
    expect(event).toBe(emittedData);
  };
  const sub1 = topic.subscribe(callBack, { topicName: 'Topic1' });
  expect(sub1).not.toBeNull();
  topic.publish(emittedData);

  // Test 'getLastValue'
  const callBack2 = (event: any) => {
    expect(event).toBe(emittedData);
  };
  const sub2 = topic.subscribe(callBack2, { topicName: 'Topic1', getLastValue: true });

  expect(topic.unsubscribe(sub2)).toBe(undefined);
});
