interface LightDevice {
  id: number;
  name: string;
  type: 'light';
  status: 'on' | 'off';
  lightness: number;
}

interface LockDevice {
  id: number;
  name: string;
  type: 'lock';
  status: 'locked' | 'unlocked';
}

interface SwitchDevice {
  id: number;
  name: string;
  type: 'switch';
  status: 'on' | 'off';
}

type SensorDevice = {
  id: number;
  name: string;
  type: 'sensor';
  value: number;
}

export type Device = LightDevice | LockDevice | SwitchDevice | SensorDevice;
