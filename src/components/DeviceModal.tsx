import Modal from './Modal';
import DeviceCard from './DeviceCard';
import type { Device } from '../models/device';

interface Props {
  device?: Device;
  onClose: () => void;
}

export default (props: Props) => {
  return <Modal isOpened={!!props.device} onClose={props.onClose}>
    {props.device && <DeviceCard device={props.device}/>}
  </Modal>;
};
