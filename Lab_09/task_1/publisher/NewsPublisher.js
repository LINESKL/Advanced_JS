import eventBus from "../pubsub/EventBus.js";

export class NewsPublisher {
  constructor(name) {
    this.name = name;
    this.articles = [];
  }

  publishArticle(category, headline, content, priority = "normal") {
    const article = {
      id: Date.now(),
      category,
      headline,
      content,
      priority,
      timestamp: new Date(),
      source: this.name,
    };

    this.articles.push(article);

    eventBus.publish(`news:${category}`, article);
    eventBus.publish("news:all", article);

    if (priority === "urgent") {
      eventBus.publish("news:urgent", article);
    }

    console.log(`[${this.name}] Published: ${headline} [${category}]`);
    return article;
  }
  getArticles(category = null) {
    if (category) {
      return this.articles.filter((a) => a.category === category);
    }
    return [...this.articles];
  }
}
