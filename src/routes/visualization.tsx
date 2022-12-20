import { useSession } from '../hooks/useSession';
import { apiHost } from '../config';
import useGet from '../hooks/useGet';
import useRequest from '../hooks/useRequest';
import DeviceModal from '../components/DeviceModal';
import { Device, parseDevice } from '../models/device';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TouchEvent, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

export default () => {
  const navigate = useNavigate();
  const session = useSession();
  const params = useParams<{ placeId: string, roomId: string }>();
  const { placeId, roomId } = params;
  const { data: devicesData, mutate: refreshDevices } = useGet(
    '/places/' + placeId + '/rooms/' + roomId + '/devices/');
  const { data: room } = useGet(
    '/places/' + placeId + '/rooms/' + roomId);
  const { put } = useRequest();

  const [draggingDeviceId, setDraggingDeviceId] = useState<number>();
  const [devices, setDevices] = useState<Device[]>([]);
  const [dragOffset, setDragOffset] = useState<{ x: number, y: number }>();

  const [selectedDeviceId, setSelectedDeviceId] = useState<number>();

  useEffect(() => {
    if (!devicesData) return;
    setDevices(devicesData.map(parseDevice));
  }, [devicesData?.length]);

  const containerRef = useRef<HTMLDivElement>(null);

  const onDragStart = (e: TouchEvent<HTMLDivElement>, id: number) => {
    setDragOffset({
      x: e.touches[0].clientX - e.currentTarget.offsetLeft,
      y: e.touches[0].clientY - e.currentTarget.offsetTop
    });
    setDraggingDeviceId(id);
  };

  const onDrag = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragOffset) return;
    const { clientX, clientY } = e.touches[0];
    setDevices(devices.map(device => {
      if (device.id !== draggingDeviceId) return device;
      return {
        ...device,
        positionX: clientX - dragOffset.x,
        positionY: clientY - dragOffset.y
      };
    }));
  };

  const onDragEnd = async () => {
    try {
      const { positionX, positionY } = devices.find(
        device => device.id === draggingDeviceId)!;
      const res = await put(
        '/places/' + placeId + '/rooms/' + roomId + '/devices/' +
        draggingDeviceId, { positionX, positionY });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setDraggingDeviceId(undefined);
      await refreshDevices();
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
            <Link to={`/places/${placeId}/rooms/${roomId}/devices`}>
              <button className="rounded-lg bg-primary px-4 py-2 text-white">
                列表查看
              </button>
            </Link>
          </div>
        </p>
      </div>

      <p className="px-6 text-xs text-primary">
        提升：可视化页面仅能使用手机触屏操作
      </p>

      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <img
          src={apiHost + '/images/places/' + placeId + '/rooms/' + roomId}
          className="w-full object-contain"
          alt="room"
          onError={() => {
            alert('户型图加载失败，请建立新房间！');
            navigate(`/places/${placeId}/rooms`);
          }}
        />
        {devices?.map((device: Device) => <div
          key={device.id}
          onTouchStart={(e) => onDragStart(e, device.id)}
          onTouchMove={(e) => onDrag(e)}
          onTouchEnd={() => onDragEnd()}
          onClick={() => setSelectedDeviceId(device.id)}
          className="absolute flex h-16 w-16 cursor-move
           select-none items-center justify-center rounded-full
            bg-primary/50 text-xs font-bold text-white"
          style={{
            top: device.positionY,
            left: device.positionX,
          }}
        >
          <p>{device.name}</p>
        </div>)}
      </div>

      {(placeId && roomId) && <DeviceModal
        placeId={+placeId}
        roomId={+roomId}
        deviceId={selectedDeviceId}
        onClose={() => setSelectedDeviceId(undefined)}
      />}

    </div>
  );
};
