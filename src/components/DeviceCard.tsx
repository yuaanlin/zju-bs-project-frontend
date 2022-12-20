import useRequest from '../hooks/useRequest';
import { useRevalidate } from '../hooks/useGet';
import type { Device } from '../models/device';

interface Props {
  device: Device;
  placeId: number;
  roomId: number;
}

export default (props: Props) => {
  return <div
    className="mb-4 flex h-32 w-full items-end rounded-lg bg-primary/10 p-4"
  >
    <p className="mr-4 grow text-3xl font-bold">{props.device.name}</p>
    <Control {...props} />
  </div>;
};

interface ControlProps {
  device: Device;
  placeId: number;
  roomId: number;
}

const Control = (props: ControlProps) => {
  const { put } = useRequest();
  const revalidate = useRevalidate();

  const updateDevice = async (newState: any) => {
    const res = await put(
      '/places/' + props.placeId + '/rooms/' +
      props.roomId + '/devices/' + props.device.id,
      { state: JSON.stringify(newState) });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    await Promise.all([
      revalidate(
        '/places/' + props.placeId + '/rooms/' + props.roomId + '/devices/'),
      revalidate(
        '/places/' + props.placeId + '/rooms/' + props.roomId + '/devices/' +
        props.device.id)
    ]);
  };

  switch (props.device.type) {
    case 'light':
      const lightStatus = props.device.state.status;
      const lightLightness = props.device.state.lightness;
      return <>
        <div
          className={`
            ${lightStatus === 'on' ? 'bg-primary/10' : ''} 
            mr-2 flex h-full w-16 cursor-pointer items-center
            justify-center rounded border border-primary/10
            `}
          onClick={() => updateDevice({
            status: lightStatus === 'on' ? 'off' : 'on',
            lightness: lightLightness
          })}
        >
          {lightStatus === 'on' ? '开' : '关'}
        </div>
        <div
          className={`
            relative flex h-full w-16 cursor-pointer items-center
            justify-center rounded border border-primary/10 bg-primary/10
            `}
          onClick={() => updateDevice({
            status: lightStatus,
            lightness: lightLightness === 100 ? 0 : (lightLightness || 0) + 10
          })}
        >
          {(lightLightness || 0)}%
          <div
            className="absolute bottom-0 w-full bg-primary/20"
            style={{ height: `${lightLightness || 0}%`, }}
          />
        </div>
      </>;
    case 'switch':
      const switchStatus = props.device.state.status;
      return <>
        <div
          className={`
            ${switchStatus === 'on' ? 'bg-primary/10' : ''} 
            mr-2 flex h-full w-16 cursor-pointer items-center
            justify-center rounded border border-primary/10
            `}
          onClick={() => updateDevice(
            { status: switchStatus === 'on' ? 'off' : 'on', })}
        >
          {switchStatus === 'on' ? '开' : '关'}
        </div>
      </>;
    case 'lock':
      const lockStatus = props.device.state.status;
      return <>
        <div
          className={`
            ${lockStatus === 'locked' ? 'bg-primary/10' : ''} 
            mr-2 flex h-full w-32 cursor-pointer items-center
            justify-center rounded border border-primary/10
            `}
          onClick={() => updateDevice(
            { status: lockStatus === 'locked' ? 'unlocked' : 'locked', })}
        >
          {lockStatus === 'locked' ? '已上锁' : '未上锁'}
        </div>
      </>;
    case 'sensor':
      const sensorValue = props.device.state.value;
      return <>
        <div
          className={`
            mr-2 flex h-full w-32 items-center
            justify-center rounded border border-primary/10
            `}
        >
          {sensorValue}
        </div>
      </>;
  }
};
