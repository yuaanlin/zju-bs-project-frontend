import LoginBackground from '../assets/login-bg.png';
import { Link } from 'react-router-dom';

export default () => {
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

      <div className="p-6">
        <p className="mb-8 text-4xl font-bold">用户登录</p>
        <div className="mb-4">
          <p>用户名</p>
          <input className="rounded-lg border p-2"/>
        </div>
        <div>
          <p>密码</p>
          <input className="rounded-lg border p-2" type="password"/>
        </div>

        <div className="mt-6 flex items-center">
          <button className="rounded-lg bg-primary px-12 py-2 text-white">
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