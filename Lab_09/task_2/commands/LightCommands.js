import { Command } from "./Command.js";

export class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}

export class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }

  undo() {
    this.light.turnOn();
  }
}

export class LightBrightnessCommand extends Command {
  constructor(light, brightness) {
    super();
    this.light = light;
    this.brightness = brightness;
    this.prevBrightness = light.state.brightness;
  }

  execute() {
    this.light.setBrightness(this.brightness);
  }

  undo() {
    this.light.setBrightness(this.prevBrightness);
  }
}

export class LightColorCommand extends Command {
  constructor(light, color) {
    super();
    this.light = light;
    this.color = color;
    this.prevColor = light.state.color;
  }

  execute() {
    this.light.setColor(this.color);
  }

  undo() {
    this.light.setColor(this.prevColor);
  }
}
