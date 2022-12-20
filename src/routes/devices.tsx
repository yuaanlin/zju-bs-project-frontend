import AutoAnimateDiv from '../components/AutoAnimateDiv';
import { useSession } from '../hooks/useSession';
import Modal from '../components/Modal';
import useRequest from '../hooks/useRequest';
import useGet from '../hooks/useGet';
import DeviceCard from '../components/DeviceCard';
import { Device, parseDevice } from '../models/device';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

export default () => {
  const session = useSession();
  const { post } = useRequest();
  const navigate = useNavigate();

  const params = useParams<{ placeId: string, roomId: string }>();
  const { placeId, roomId } = params;

  const [isCreatingDevice, setIsCreatingDevice] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState<Device['type']>('light');

  const { data: deviceData, mutate: refreshDevices } = useGet(
    '/places/' + placeId + '/rooms/' + roomId + '/devices/');
  const { data: room, mutate: refreshRoom } = useGet(
    '/places/' + placeId + '/rooms/' + roomId);

  const devices = deviceData?.map((d: any) => parseDevice(d));

  const submit = async () => {
    try {
      const res = await post(
        '/places/' + placeId + '/rooms/' + roomId + '/devices/', {
          name: deviceName,
          type: deviceType
        });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setIsCreatingDevice(false);
      await refreshDevices();
      await refreshRoom();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="mb-32">

      <div className="flex w-full justify-between">
        <Link to={`/places/${placeId}/rooms`} className="flex items-center p-4">
          <ChevronLeftIcon className="h-6 w-6 text-primary"/>
          <p className="font-bold text-primary">返回房间列表</p>
        </Link>
        <p
          className="cursor-pointer p-6 font-bold text-primary"
          onClick={() => {
            session.clearToken();
            navigate('/login');
          }}
        >
          登出
        </p>
      </div>

      <div className="p-6 pt-0">
        <p className="flex">
          <span className="mr-4 grow text-5xl font-bold">{room?.name}</span>
          <div>
            <p>共 {room?.deviceCount} 个设备</p>
            <Link to={`/places/${placeId}/rooms/${roomId}/visualization`}>
              <button className="rounded-lg bg-primary px-4 py-2 text-white">
                可視化查看
              </button>
            </Link>
          </div>
        </p>
      </div>
      {(placeId && roomId) && <AutoAnimateDiv className="px-6">
        {devices?.map((device: Device) => <DeviceCard
          placeId={+placeId}
          roomId={+roomId}
          key={device.id}
          device={device}
        />)}
        <div
          key="new"
          className="mb-4 flex h-32 w-full items-end
             rounded-lg bg-primary/20 p-4"
          onClick={() => setIsCreatingDevice(true)}
        >
          <p className="text-center">+ 新增设备</p>
        </div>
      </AutoAnimateDiv>}

      <Modal
        isOpened={isCreatingDevice}
        onClose={() => setIsCreatingDevice(false)}
      >
        <p className="mb-8 font-bold">新增设备</p>
        <div className="mb-4">
          <p className="mb-2">设备名</p>
          <input
            className="rounded-lg border p-2"
            value={deviceName}
            onChange={e => setDeviceName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p className="mb-2">设备类型</p>
          <select
            className="rounded-lg border p-2"
            value={deviceType}
            onChange={e => setDeviceType(e.target.value as Device['type'])}
          >
            <option value="light">灯</option>
            <option value="lock">锁</option>
            <option value="switch">开关</option>
            <option value="sensor">传感器</option>
          </select>
        </div>
        <div className="mt-6 flex items-center">
          <button
            className="rounded-lg bg-primary px-12 py-2 text-white"
            onClick={submit}
          >
            确定
          </button>
          <p
            className="cursor-pointer px-12 text-zinc-600"
            onClick={() => setIsCreatingDevice(false)}
          >
            取消
          </p>
        </div>
      </Modal>
    </div>
  );
};
