import AutoAnimateDiv from '../components/AutoAnimateDiv';
import { useSession } from '../hooks/useSession';
import useGet from '../hooks/useGet';
import Modal from '../components/Modal';
import useRequest from '../hooks/useRequest';
import Room from '../models/room';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';

export default () => {
  const session = useSession();
  const navigate = useNavigate();
  const params = useParams<{ placeId: string }>();

  const { post } = useRequest();

  const { placeId } = params;

  const { data: rooms, mutate: refreshRooms } = useGet(
    '/places/' + placeId + '/rooms/');
  const { data: place, mutate: refreshPlace } = useGet('/places/' + placeId);

  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomImage, setRoomImage] = useState<File>();

  const submit = async () => {
    const res = await post('/places/' + placeId + '/rooms/', {
      name: roomName,
      image: roomImage
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    await refreshRooms();
    await refreshPlace();
    setIsCreatingRoom(false);
  };

  const roomImageObjectUrl = useMemo(() => {
    if (roomImage) {
      return URL.createObjectURL(roomImage);
    }
    return undefined;
  }, [roomImage]);

  return (
    <div className="mb-32">

      <div className="flex w-full justify-between">
        <Link to="/places">
          <p className="p-6 font-bold text-primary">返回场所列表</p>
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
        <p>
          <span className="mr-4 text-5xl font-bold">
            {place?.name}
          </span>
          共 {place?.roomCount} 个房间
        </p>
      </div>
      <AutoAnimateDiv className="px-6">
        {rooms?.map((room: Room) => <Link
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
        <div
          key="new"
          className="mb-4 flex h-32 w-full items-end
             rounded-lg bg-primary/20 p-4"
          onClick={() => setIsCreatingRoom(true)}
        >
          <p className="text-center">+ 创建房间</p>
        </div>
      </AutoAnimateDiv>

      <Modal
        isOpened={isCreatingRoom}
        onClose={() => setIsCreatingRoom(false)}
      >
        <p className="mb-8 font-bold">新增房间</p>
        <div className="mb-4">
          <p className="mb-2">房间名</p>
          <input
            className="rounded-lg border p-2"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p className="mb-2">户型图</p>
          <input
            type="file"
            className="rounded-lg border p-2"
            onChange={e => setRoomImage(e.target.files?.[0])}
          />
          {roomImageObjectUrl && <img
            className="mt-4"
            src={roomImageObjectUrl}
            alt="roomImage"
          />}
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
            onClick={() => setIsCreatingRoom(false)}
          >
            取消
          </p>
        </div>
      </Modal>
    </div>
  );
};
