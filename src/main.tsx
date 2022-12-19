import Login from './routes/login';
import Register from './routes/register';
import Places from './routes/places';
import Rooms from './routes/rooms';
import Devices from './routes/devices';
import Visualization from './routes/visualization';
import { SessionProvider, useSession } from './hooks/useSession';
import './index.css';
import Footer from './components/Footer';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from 'react-router-dom';
import React, { useEffect } from 'react';

const RedirectBySessionStatus = () => {
  const session = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (session.isLoading) return;
    if (session.token) navigate('/places');
    else navigate('/login');
  }, [session.isLoading, session.token]);
  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RedirectBySessionStatus/>
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/register',
    element: <Register/>,
  },
  {
    path: '/places',
    element: <Places/>,
  },
  {
    path: '/places/:placeId/rooms',
    element: <Rooms/>,
  },
  {
    path: '/places/:placeId/rooms/:roomId/devices',
    element: <Devices/>,
  },
  {
    path: '/places/:placeId/rooms/:roomId/visualization',
    element: <Visualization/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <div className="mx-auto max-w-md">
        <RouterProvider router={router}/>
        <Footer/>
      </div>
    </SessionProvider>
  </React.StrictMode>,
);

