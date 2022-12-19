import LoginBackground from '../assets/login-bg.png';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

interface RegisterForm {
  username: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  email: string;
}

export default () => {

  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    username: ''
  });

  const handleChange = (key: keyof RegisterForm) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [key]: e.target.value
      });
    };

  const submit = async () => {
    navigate('/places');
  };

  return (
    <div className="mb-32">
      <div className="relative">
        <img
          src={LoginBackground}
          alt="login background"
          className="h-36 w-full object-cover object-bottom"
        />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <p className="opacity-60">欢迎回来</p>
          <p className="text-2xl font-bold">智能家居管理系统</p>
        </div>
      </div>

      <div className="p-6 font-bold">
        <p className="mb-4 text-4xl font-bold">用户注册</p>
        <div className="mb-8 flex font-normal">
          <p>已有账号？</p>
          <Link to="/" className="text-primary">立即登录</Link>
        </div>

        <div className="mb-4">
          <p>用户名</p>
          <input
            className="rounded-lg border p-2"
            value={form.username}
            onChange={handleChange('username')}
          />
        </div>

        <div className="mb-4">
          <p>手机号</p>
          <input
            className="rounded-lg border p-2"
            value={form.username}
            onChange={handleChange('username')}
          />
        </div>

        <div className="mb-4">
          <p>密码</p>
          <input
            className="rounded-lg border p-2"
            value={form.username}
            onChange={handleChange('username')}
            type="password"/>
        </div>

        <div className="mb-4">
          <p>确认密码</p>
          <input
            className="rounded-lg border p-2"
            value={form.username}
            onChange={handleChange('username')}
            type="password"/>
        </div>

        <div className="mb-4">
          <p>昵称</p>
          <input
            className="rounded-lg border p-2"
            value={form.username}
            onChange={handleChange('username')}
          />
        </div>

        <div className="mb-4">
          <p>邮箱</p>
          <input
            className="rounded-lg border p-2"
            value={form.username}
            onChange={handleChange('username')}
          />
        </div>

        <div className="mt-6 flex items-center">
          <button
            className="rounded-lg bg-primary px-12 py-2 text-white"
            onClick={submit}
          >
            注册
          </button>
        </div>
      </div>
    </div>
  );
};
