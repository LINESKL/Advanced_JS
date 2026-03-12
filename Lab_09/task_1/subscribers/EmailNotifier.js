import eventBus from "../pubsub/EventBus.js";

export class EmailNotifier {
  constructor(email) {
    this.email = email;
    this.subscriptions = [];
    this.sentCount = 0;
  }

  subscribe(categories) {
    categories.forEach((category) => {
      const unsubscribe = eventBus.subscribe(`news:${category}`, (article) => {
        this.sendEmail(article);
      });
      this.subscriptions.push(unsubscribe);
    });
    console.log(
      `[EmailNotifier] Subscribed to categories: ${categories.join(", ")}`,
    );
  }

  sendEmail(article) {
    this.sentCount++;
    console.log(
      `[EmailNotifier] Sent email to ${this.email} about article: "${article.headline}" (Total sent: ${this.sentCount})`,
    );
    console.log(`Category: ${article.category}, Priority: ${article.priority}`);
  }

  unsubscribe() {
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
    this.subscriptions = [];
    console.log(`[EmailNotifier] Unsubscribed from all categories`);
  }

  getStats() {
    return { sent: this.sentCount, subscribed: this.subscriptions.length };
  }
}
