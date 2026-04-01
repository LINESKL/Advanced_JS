export class EventDelegator {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.handlers = new Map();

        this.container.addEventListener("click", this.handleClick.bind(this));
        this.container.addEventListener("dblclick", this.handleDoubleClick.bind(this));
    }

    handleClick(event) {
        const target = event.target;
        const action = target.dataset.action;

        if (!action) return;

        const itemId = target.closest("[data-id]")?.dataset.id;
        this.emit(action, { id: itemId, target });
    }

    handleDoubleClick(event) {
        const item = event.target.closest("[data-id]");
        if (item) {
            this.emit("edit-start", { id: item.dataset.id });
        }
    }

    on(event, handler) {
        if (!this.handlers.has(event)) this.handlers.set(event, []);
        this.handlers.get(event).push(handler);
    }

    emit(event, data) {
        const handlers = this.handlers.get(event);
        if (handlers) handlers.forEach(h => h(data));
    }
}