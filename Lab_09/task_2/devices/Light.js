import { Device } from "./Device.js";

export class Light extends Device {
  constructor(name, room) {
    super(name, "Light");
    this.room = room;
  }

  getDefaultState() {
    return { power: false, brightness: 100, color: "#ffffff" };
  }

  turnOn() {
    this.updateState({ power: true });
    console.log(`[Light] ${this.room} light turned ON`);
  }

  turnOff() {
    this.updateState({ power: false });
    console.log(`[Light] ${this.room} light turned OFF`);
  }

  setBrightness(level) {
    this.updateState({ brightness: Math.max(0, Math.min(100, level)) });
    console.log(
      `[Light] ${this.room} light brightness set to ${this.state.brightness}%`,
    );
  }

  setColor(color) {
    this.updateState({ color });
    console.log(`[Light] ${this.room} light color set to ${this.state.color}`);
  }
}
