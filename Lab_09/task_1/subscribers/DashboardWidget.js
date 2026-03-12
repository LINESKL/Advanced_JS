import eventBus from "../pubsub/EventBus.js";

export class DashboardWidget {
  constructor(widgetName) {
    this.widgetName = widgetName;
    this.subscriptions = [];
  }

  subscribe(categories) {
    categories.forEach((category) => {
      const unsubscribe = eventBus.subscribe(`news:${category}`, (article) => {
        this.updateUI(article);
      });
      this.subscriptions.push(unsubscribe);
    });
  }

  updateUI(article) {
    console.log(
      `[Dashboard ${this.widgetName}] Displaying: ${article.headline}`,
    );
  }

  unsubscribe() {
    this.subscriptions.forEach((unsub) => unsub());
    this.subscriptions = [];
  }

  getStats() {
    return {
      received: this.subscriptions.length,
      subscribed: this.subscriptions.length,
    };
  }
}
