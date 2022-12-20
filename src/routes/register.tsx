import LoginBackground from '../assets/login-bg.png';
import useRequest from '../hooks/useRequest';
import { useSession } from '../hooks/useSession';
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
  const { post } = useRequest();
  const session = useSession();

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

    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!usernameRegex.test(form.username)) {
      alert('用户名必须至少6位，只能包含字母和数字');
      return;
    }

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(form.password)) {
      alert('密码必须至少6位，只能包含字母、数字和符号');
      return;
    }

    if (form.password !== form.passwordConfirm) {
      alert('两次输入密码不一致');
      return;
    }

    if (form.nickname.length === 0) {
      alert('昵称不得为空');
      return;
    }

    const phoneRegex = /^1[3456789]\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      alert('请输入正确的手机号');
      return;
    }

    // eslint-disable-next-line max-len
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(form.email)) {
      alert('请输入正确的邮箱');
      return;
    }

    try {

      const res = await post('/user/register', {
        username: form.username,
        password: form.password,
        nickname: form.nickname,
        phone: form.phone,
        email: form.email
      });

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
            value={form.phone}
            onChange={handleChange('phone')}
          />
        </div>

        <div className="mb-4">
          <p>密码</p>
          <input
            className="rounded-lg border p-2"
            value={form.password}
            onChange={handleChange('password')}
            type="password"/>
        </div>

        <div className="mb-4">
          <p>确认密码</p>
          <input
            className="rounded-lg border p-2"
            value={form.passwordConfirm}
            onChange={handleChange('passwordConfirm')}
            type="password"/>
        </div>

        <div className="mb-4">
          <p>昵称</p>
          <input
            className="rounded-lg border p-2"
            value={form.nickname}
            onChange={handleChange('nickname')}
          />
        </div>

        <div className="mb-4">
          <p>邮箱</p>
          <input
            className="rounded-lg border p-2"
            value={form.email}
            onChange={handleChange('email')}
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
