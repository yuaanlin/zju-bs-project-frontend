import type { Device } from '../models/device';

interface Props {
  device: Device;
}

export default (props: Props) => {
  return <div
    className="mb-4 flex h-32 w-full items-end rounded-lg bg-primary/10 p-4"
  >
    <p className="mr-4 text-5xl font-bold">{props.device.name}</p>
  </div>;
};
