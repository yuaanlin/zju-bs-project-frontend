import AutoAnimateDiv from '../components/AutoAnimateDiv';
import { Link, useParams } from 'react-router-dom';

interface Room {
  id: number;
  name: string;
  deviceCount: number;
}

const mockRooms: Room[] = [
  {
    id: 1,
    name: '大厅',
    deviceCount: 3,
  },
  {
    id: 2,
    name: '102 房',
    deviceCount: 6,
  },
  {
    id: 3,
    name: '103 房',
    deviceCount: 6,
  },
  {
    id: 4,
    name: '104 房',
    deviceCount: 6,
  }
];

export default () => {
  const params = useParams<{ placeId: string }>();
  const { placeId } = params;
  return (
    <div className="mb-32">

      <Link to="/places">
        <p className="p-6 font-bold text-primary">返回场所列表</p>
      </Link>

      <div className="p-6 pt-0">
        <p>
          <span className="mr-4 text-5xl font-bold">公司</span>
          共 5 个房间
        </p>
      </div>
      <AutoAnimateDiv className="px-6">
        {mockRooms.map((room) => <Link
          to={`/places/${placeId}/rooms/${room.id}/devices`}
          key={room.id}
        >
          <div
            className="mb-4 flex h-32 w-full items-end
             rounded-lg bg-primary/10 p-4"
          >
            <p>
              <span className="mr-4 text-5xl font-bold">{room.name}</span>
              共 {room.deviceCount} 个设备
            </p>
          </div>
        </Link>)}
      </AutoAnimateDiv>
    </div>
  );
};
