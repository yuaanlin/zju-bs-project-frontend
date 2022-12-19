import AutoAnimateDiv from '../components/AutoAnimateDiv';
import { Link, useParams } from 'react-router-dom';

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

type Device = LightDevice | LockDevice;

const mockDevices: Device[] = [
  {
    id: 1,
    name: '客厅灯',
    type: 'light',
    status: 'on',
    lightness: 100,
  },
  {
    id: 2,
    name: '卧室灯',
    type: 'light',
    status: 'off',
    lightness: 0,
  },
  {
    id: 3,
    name: '后门锁',
    type: 'lock',
    status: 'locked',
  }
];

export default () => {
  const params = useParams<{ placeId: string, roomId: string }>();
  const { placeId } = params;

  return (
    <div className="mb-32">
      <Link to={`/places/${placeId}/rooms`}>
        <p className="p-6 font-bold text-primary">返回房间列表</p>
      </Link>
      <div className="p-6 pt-0">
        <p>
          <span className="mr-4 text-5xl font-bold">101 房</span>
          共 5 个设备
        </p>
      </div>
      <AutoAnimateDiv className="px-6">
        {mockDevices.map((device) => <div
          key={device.id}
          className="mb-4 flex h-32 w-full items-end
             rounded-lg bg-primary/10 p-4"
        >
          <p className="mr-4 text-5xl font-bold">{device.name}</p>
        </div>)}
      </AutoAnimateDiv>
    </div>
  );
};
