import eventBus from "../../task_1/pubsub/EventBus.js";

export class HomeMediator {
  constructor() {
    this.devices = new Map();
    this.automationRules = [];
  }

  registerDevice(device) {
    this.devices.set(device.name, device);
    device.setMediator(this);
    console.log(`[HomeMediator] Registered device: ${device.name}`);
  }

  unregisterDevice(deviceName) {
    if (this.devices.has(deviceName)) {
      this.devices.get(deviceName).setMediator(null);
      this.devices.delete(deviceName);
      console.log(`[HomeMediator] Unregistered device: ${deviceName}`);
    }
  }

  notify(sender, changedProperty) {
    console.log(
      `[HomeMediator] Notified of change from ${sender.name}:`,
      changedProperty,
    );

    eventBus.publish("device:change", {
      device: sender,
      property: changedProperty,
      type: sender.type,
    });

    this.checkAutomationRules(sender, changedProperty);
  }

  getAllDevices() {
    return Array.from(this.devices.values());
  }

  addRule(rule) {
    this.automationRules.push(rule);
    console.log(`[HomeMediator] Added automation rule: ${rule.name}`);
  }

  checkAutomationRules(device, state) {
    this.automationRules.forEach((rule) => {
      if (rule.condition(device, state)) {
        console.log(`[HomeMediator] Automation rule triggered: ${rule.name}`);
        rule.action(this.devices);
      }
    });
  }
}
