import AutoAnimateDiv from '../components/AutoAnimateDiv';
import { useSession } from '../hooks/useSession';
import useGet from '../hooks/useGet';
import Modal from '../components/Modal';
import useRequest from '../hooks/useRequest';
import Place from '../models/place';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default () => {

  const session = useSession();
  const navigate = useNavigate();
  const { data, mutate } = useGet('/places/');
  const { post } = useRequest();

  const [isCreatingPlace, setIsCreatingPlace] = useState(false);
  const [placeName, setPlaceName] = useState('');

  const submit = async () => {
    const res = await post('/places/', { name: placeName });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    await mutate();
    setIsCreatingPlace(false);
  };

  return (
    <div className="mb-32">

      <div className="flex w-full justify-between">
        <p className="p-6 font-bold text-primary"/>
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
        <p className="mb-4 text-4xl font-bold">场所列表</p>
        <p>以下是您所有装有智能家居设备的场所列表，您可以新增「家」、「公司」等场所。</p>
      </div>
      <AutoAnimateDiv className="px-6">
        {data?.map((place: Place) => <Link
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
        <div
          key="new"
          className="mb-4 flex h-32 w-full items-end
             rounded-lg bg-primary/20 p-4"
          onClick={() => setIsCreatingPlace(true)}
        >
          <p className="text-center">+ 创建场所</p>
        </div>
      </AutoAnimateDiv>

      <Modal
        isOpened={isCreatingPlace}
        onClose={() => setIsCreatingPlace(false)}
      >
        <p className="mb-8 font-bold">新增场所</p>
        <div className="mb-4">
          <p className="mb-2">场所名</p>
          <input
            className="rounded-lg border p-2"
            value={placeName}
            onChange={e => setPlaceName(e.target.value)}
          />
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
            onClick={() => setIsCreatingPlace(false)}
          >
            取消
          </p>
        </div>
      </Modal>
    </div>
  );
};
