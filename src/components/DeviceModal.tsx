import Modal from './Modal';
import DeviceCard from './DeviceCard';
import useGet from '../hooks/useGet';
import { parseDevice } from '../models/device';

interface Props {
  onClose: () => void;
  placeId: number;
  roomId: number;
  deviceId?: number;
}

export default (props: Props) => {

  const { data } = useGet(
    `/places/${props.placeId}/rooms/${props.roomId}/devices/${props.deviceId}`,
    !!props.deviceId);

  const device = !!data ? parseDevice(data) : undefined;

  return <Modal isOpened={!!props.deviceId} onClose={props.onClose}>
    {device && <DeviceCard
      device={device}
      placeId={props.placeId}
      roomId={props.roomId}
    />}
  </Modal>;
};
