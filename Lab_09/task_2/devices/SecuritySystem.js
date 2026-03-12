import { Device } from "./Device.js";

export class SecuritySystem extends Device {
  constructor(name, room) {
    super(name, "SecuritySystem");
    this.room = room;
  }

  getDefaultState() {
    return { power: false, armed: false };
  }

  turnOn() {
    this.updateState({ power: true });
    console.log(`[SecuritySystem] ${this.room} security system turned ON`);
  }

  turnOff() {
    this.updateState({ power: false });
    console.log(`[SecuritySystem] ${this.room} security system turned OFF`);
  }

  arm() {
    this.updateState({ armed: true });
    console.log(`[SecuritySystem] ${this.room} security system armed`);
  }

  disarm() {
    this.updateState({ armed: false });
    console.log(`[SecuritySystem] ${this.room} security system disarmed`);
  }
}
