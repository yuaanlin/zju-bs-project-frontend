import AutoAnimateDiv from '../components/AutoAnimateDiv';
import { Link } from 'react-router-dom';

interface Place {
  id: number;
  name: string;
  roomCount: number;
}

const mockPlaces: Place[] = [
  {
    id: 1,
    name: '家',
    roomCount: 3,
  },
  {
    id: 2,
    name: '公司',
    roomCount: 6,
  }
];

export default () => {
  return (
    <div className="mb-32">
      <div className="p-6 pt-12">
        <p className="mb-4 text-4xl font-bold">场所列表</p>
        <p>以下是您所有装有智能家居设备的场所列表，您可以新增「家」、「公司」等场所。</p>
      </div>
      <AutoAnimateDiv className="px-6">
        {mockPlaces.map((place) => <Link
          to={`/places/${place.id}/rooms`}
          key={place.id}
        >
          <div
            className="mb-4 flex h-32 w-full items-end
             rounded-lg bg-primary/20 p-4"
          >
            <p>
              <span className="mr-4 text-5xl font-bold">{place.name}</span>
              共 {place.roomCount} 个房间
            </p>
          </div>
        </Link>)}
      </AutoAnimateDiv>
    </div>
  );
};
