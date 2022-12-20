import LoginBackground from '../assets/login-bg.png';
import useRequest from '../hooks/useRequest';
import { useSession } from '../hooks/useSession';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default () => {

  const navigate = useNavigate();
  const session = useSession();
  const { post } = useRequest();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      const res = await post('/user/login', { username, password });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      session.setToken(data.token);
      navigate('/places');
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div className="relative">
        <img
          src={LoginBackground}
          alt="login background"
          className="w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <p className="opacity-60">欢迎回来</p>
          <p className="text-2xl font-bold">智能家居管理系统</p>
        </div>
      </div>
      <div className="mb-32 p-6">
        <p className="mb-8 text-4xl font-bold">用户登录</p>
        <div className="mb-4">
          <p>用户名</p>
          <input
            className="rounded-lg border p-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p>密码</p>
          <input
            className="rounded-lg border p-2"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-6 flex items-center">
          <button
            className="rounded-lg bg-primary px-12 py-2 text-white"
            onClick={submit}
          >
            登录
          </button>
          <div className="ml-4 flex">
            <p>没有账号？</p>
            <Link to="/register" className="text-primary">立即注册</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
