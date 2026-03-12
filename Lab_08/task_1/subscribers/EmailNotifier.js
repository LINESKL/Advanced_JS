import eventBus from "../pubsub/EventBus";

export default class EmailNotifier {
  constructor(email) {
    this.email = email;
    this.subcriptions = [];
    this.sentCount = 0;
  }

  subcribe(categories) {
    categories.forEach((category) => {
      const unsubcribe = eventBus.subscribe(`news:${category}`, (article) => {
        this.sendEmail(article);
      });
      this.subcriptions.push(unsubcribe);
    });
    console.log(
      `[EmailNotifier] Subscribed to categories: ${categories.join(", ")}`,
    );
  }
}
