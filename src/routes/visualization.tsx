import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-6">
        <p className="mb-8 text-4xl font-bold">场所列表</p>
      </div>
    </div>
  );
};
