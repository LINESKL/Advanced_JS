export class ViewModel {
    constructor() {
        this._bindings = new Map();
    }

    defineProperty(name, initialValue) {
        let value = initialValue;
        const subscribers = new Set();

        Object.defineProperty(this, name, {
            get() { return value; },
            set(newValue) {
                const oldValue = value;
                value = newValue;
                this.notify(name, newValue, oldValue);
            },
            enumerable: true,
            configurable: true
        });

        this._bindings.set(name, { subscribers, value });
    }

    $watch(name, callback) {
        const binding = this._bindings.get(name);
        if (binding) {
            binding.subscribers.add(callback);
        }
    }

    $unwatch(name, callback) {
        const binding = this._bindings.get(name);
        if (binding) {
            binding.subscribers.delete(callback);
        }
    }

    notify(name, newValue, oldValue) {
        const binding = this._bindings.get(name);
        if (binding) {
            binding.value = newValue;
            binding.subscribers.forEach(callback => callback(newValue, oldValue));
        }
    }

    $data() {
        const data = {};
        this._bindings.forEach((binding, name) => {
            data[name] = binding.value;
        });
        return data;
    }
}