import eventBus from "../pubsub/EventBus.js";

export class PushNotifier {
  constructor(deviceId) {
    this.deviceId = deviceId;
    this.subscriptions = [];
  }

  subscribe(categories) {
    categories.forEach((category) => {
      const unsubscribe = eventBus.subscribe(`news:${category}`, (article) => {
        this.sendPush(article);
      });
      this.subscriptions.push(unsubscribe);
    });
  }

  sendPush(article) {
    console.log(
      `[Push Notification to Device ${this.deviceId}]: ${article.headline}`,
    );
  }

  unsubscribe() {
    this.subscriptions.forEach((unsub) => unsub());
    this.subscriptions = [];
  }

  getStats() {
    return {
      sent: this.subscriptions.length,
      subscribed: this.subscriptions.length,
    };
  }
}
