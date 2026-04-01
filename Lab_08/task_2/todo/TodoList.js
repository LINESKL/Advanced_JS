import { EventDelegator } from "../delegate/EventDelegator.js";

export class TodoList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = new Map();
        this.idCounter = 0;
        this.delegator = new EventDelegator(`#${containerId}`);

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.delegator.on("delete", ({ id }) => this.deleteItem(id));
        this.delegator.on("toggle", ({ id, target }) => this.toggleItem(id, target.checked));
        this.delegator.on("priority", ({ id, target }) => {
            const priority = target.dataset.priority;
            this.setPriority(id, priority);
        });
    }

    addItem(text, priority = "normal") {
        const id = `todo-${++this.idCounter}`;
        const item = { id, text, completed: false, priority };
        this.items.set(id, item);
        this.renderItem(item);
    }

    renderItem(item) {
        const div = document.createElement("div");
        div.className = `todo-item ${item.priority}`;
        div.dataset.id = item.id;
        div.innerHTML = `
            <input type="checkbox" data-action="toggle" ${item.completed ? "checked" : ""}>
            <span class="todo-text">${item.text}</span>
            <div class="actions">
                <button data-action="priority" data-priority="high">High</button>
                <button data-action="priority" data-priority="normal">Normal</button>
                <button data-action="delete">Delete</button>
            </div>
        `;
        this.container.appendChild(div);
    }

    deleteItem(id) {
        this.items.delete(id);
        this.container.querySelector(`[data-id="${id}"]`)?.remove();
    }

    toggleItem(id, completed) {
        const item = this.items.get(id);
        if (item) item.completed = completed;
    }

    setPriority(id, priority) {
        const item = this.items.get(id);
        if (item) {
            item.priority = priority;
            const el = this.container.querySelector(`[data-id="${id}"]`);
            el.className = `todo-item ${priority}`;
        }
    }

    generateItems(count = 1000) {
        for (let i = 0; i < count; i++) {
            this.addItem(`Task #${i}`, i % 3 === 0 ? "high" : "normal");
        }
    }
}