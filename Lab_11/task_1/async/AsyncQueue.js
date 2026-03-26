export class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
    this.results = [];
    this.errors = [];
  }
  async add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }
  async addAll(tasks) {
    return Promise.all(tasks.map((task) => this.add(task)));
  }
  async process() {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();
      this.running++;
      task()
        .then((result) => {
          this.results.push(result);
          resolve(result);
        })
        .catch((error) => {
          this.errors.push(error);
          reject(error);
        })
        .finally(() => {
          this.running--;
          this.process();
        });
    }
  }

  getStats() {
    return {
      pending: this.queue.length,
      running: this.running,
      completed: this.results.length,
      failed: this.errors.length,
    };
  }

  clear() {
    this.queue = [];
    this.results = [];
    this.errors = [];
  }
}
export class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  async acquire() {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);
    if (this.requests.length >= this.maxRequests) {
      const waitTime = this.windowMs - (now - this.requests[0]);
      console.log(`[RateLimiter] Waiting ${waitTime}ms`);
      await sleep(waitTime);
      return this.acquire();
    }
    this.requests.push(now);
    return true;
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
