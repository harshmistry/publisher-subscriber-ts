# publisher-subscriber-ts

Publisher subscriber library for javascript.

  

## Setup
1. npm *install*
2. npm run *prepare*
  
**Prepare** will build this project and create a *lib* folder which'll contain *publisher.min.js* for consumption. It'll also create a ES6 version called *publisher.es.js* and couple of declaration files.

  
## Running test
3. npm run test

This will execute **Jest** on project.

  

## Usage

* This package has concept of **_Publisher_** and **_Subscriber_**

* A **_Publisher_** communicates with all it's **_Subscriber_** through something called **_Topic_**

* A **_Publisher_** can create any number of **_Topic_** and emit event/data to each **_Topic_**

* A **_Subscriber_** can subscribe/listen to any number of **_Topic_** by providing a callback function

* A **_Subscriber_** can unsubscribe any **_Topic_** at any given time

  

## Example

### 1. Creating a Topic

```javascript

// @class Publisher has static helper methods
const  topic1  =  Publisher.createTopic("Topic 1");
```

### 2. Subscribing a Topic
```javascript
// Subscription option takes topic name and optional 'getLastValue' flag which indicates if subscriber should reveice last emitted value from topic
const  subscriptionOption  = {
	topicName: "Topic 1",
	getLastValue: true
};

// @class Publisher has static helper methods
const  subscription1  =  Publisher.subscribeTopic(subscriptionOption, (event) => {
	console.log('Callback function event: ', event);
});
``` 

### 3. Emitting date from topic

```javascript
const  event  = {
	data: 'Some random data to be broadcasted'
};

// We use object created from "Publisher.createTopic()"
topic1.publish(event);
```
### 4. Unsubscribing a Topic

```javascript
// @class Publisher has static helper methods. Pass topic name and subscription object to be unsubscribed.
Publisher.unsubscribeTopic("Topic 1", subscription1);
```

## Documentation

#### 1. @class **Publisher**

| Method | Description |
| -------| ------------|
|*createTopic(topicName: string)* | Creates new topic for given topic name|
|*subscribeTopic(option: SubscribeOption, callback: Function): Subscriber* | Subscribe to a particular topic by providing option and a callback function|
|*unsubscribeTopic(topicName: string, subscriber: Subscriber)* | Unsubscribe any topic for given subscriber|


#### 2. @class **Subscriber**
| Method | Description |
|------- | ------------|
|*callBack* | Getter for returning callback function|
|*id* | Getter for returning subscrber ID|

  

#### 3. @class **Topic**

|Method | Description|
|-------| -----------|
|*publish(event: any)* | Publish any event for current topic. Once event is published all active subscribers will get a notification in callback function|
|*unsubscribe(subscription: Subscriber)* | Method to unsubscribe/remove a listener of this topic|
|*topicName* | Getter for returning topic name|

#### 4. @interface **SubscribeOption**
|Property | Description|
|-------- | -----------|
|*topicName* | **Required** string option to pass name|
|*getLastValue* | **Optional** boolean flag to indicate if last emitted value from topic should be re-emitted for given subscriber only. Default value is __*false*__ |