import { Device } from "./Device.js";

export class Thermostat extends Device {
  constructor(name, room) {
    super(name, "Thermostat");
    this.room = room;
  }

  getDefaultState() {
    return { power: false, temperature: 22 };
  }

  turnOn() {
    this.updateState({ power: true });
    console.log(`[Thermostat] ${this.room} thermostat turned ON`);
  }

  turnOff() {
    this.updateState({ power: false });
    console.log(`[Thermostat] ${this.room} thermostat turned OFF`);
  }

  setTemperature(temp) {
    this.updateState({ temperature: temp });
    console.log(
      `[Thermostat] ${this.room} thermostat temperature set to ${this.state.temperature}°C`,
    );
  }
}
