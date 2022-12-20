interface LightDevice {
  id: number;
  name: string;
  type: 'light';
  positionX: number;
  positionY: number;
  state: {
    status: 'on' | 'off';
    lightness: number;
  };
}

interface LockDevice {
  id: number;
  name: string;
  type: 'lock';
  positionX: number;
  positionY: number;
  state: {
    status: 'locked' | 'unlocked';
  };
}

interface SwitchDevice {
  id: number;
  name: string;
  type: 'switch';
  positionX: number;
  positionY: number;
  state: {
    status: 'on' | 'off';
  };
}

type SensorDevice = {
  id: number;
  name: string;
  type: 'sensor';
  positionX: number;
  positionY: number;
  state: {
    value: number;
  }
}

export function parseDevice(raw: any): Device {
  if (typeof raw.state === 'object') return raw;
  try {
    raw.state = JSON.parse(raw.state);
  } catch (e) {
    raw.state = {};
  }
  return raw;
}

export type Device = LightDevice | LockDevice | SwitchDevice | SensorDevice;
