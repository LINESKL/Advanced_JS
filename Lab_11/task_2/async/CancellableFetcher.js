export class CancellableFetcher {
  constructor() {
    this.abortControllers = new Map();
  }

  createAbortSignal(id) {
    const controller = new AbortController();
    this.abortControllers.set(id, controller);
    return controller.signal;
  }

  cancel(id) {
    const controller = this.abortControllers.get(id);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(id);
    }
  }

  cancelAll() {
    this.abortControllers.forEach((controller) => controller.abort());
    this.abortControllers.clear();
  }

  async fetch(url, options = {}) {
    const id = options.id || Math.random().toString(36);
    const signal = this.createAbortSignal(id);

    try {
      const result = await fetch(url, { ...options, signal });
      this.abortControllers.delete(id);
      return result;
    } catch (error) {
      this.abortControllers.delete(id);
      if (error.name === 'AbortError') {
        throw new Error(`Request ${id} was cancelled`);
      }
      throw error;
    }
  }
}

export async function withCancellation(promise, signal) {
  if (!signal) return promise;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(new Error('Cancelled')));
    }),
  ]);
}

export function createCancellableTask(asyncFn) {
  let isCancelled = false;
  const signal = {
    get aborted() {
      return isCancelled;
    },
  };
  const wrappedFn = async (...args) => {
    if (isCancelled) {
      throw new Error('Task was cancelled');
    }
    const result = await asyncFn(...args);
    if (isCancelled) {
      throw new Error('Task was cancelled');
    }
    return result;
  };
  return {
    execute: wrappedFn,
    cancel: () => {
      isCancelled = true;
    },
    signal,
  };
}

export class TaskRunner {
  constructor() {
    this.tasks = new Map();
    this.nextId = 0;
  }

  add(asyncFn) {
    const id = `task-${this.nextId++}`;
    const task = createCancellableTask(asyncFn);
    this.tasks.set(id, task);
    return { id, task };
  }

  cancel(id) {
    const task = this.tasks.get(id);
    if (task) {
      task.cancel();
      this.tasks.delete(id);
    }
  }

  cancelAll() {
    this.tasks.forEach((task) => task.cancel());
    this.tasks.clear();
  }

  async run(id) {
    const task = this.tasks.get(id);
    if (!task) {
      throw new Error(`Task ${id} not found`);
    }
    try {
      const result = await task.execute();
      this.tasks.delete(id);
      return result;
    } catch (error) {
      this.tasks.delete(id);
      throw error;
    }
  }
}