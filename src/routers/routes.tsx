import { type RouteObject } from 'react-router';
import App from '../App';
import VoiceToTextPage from '../pages/VoiceToTextPage';
import Layout from '@/components/Layout';
import AuthPage from '@/pages/AuthPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        id: 'Главная',
        index: true,
        element: <App />,
      },
      {
        id: 'Голосовой набор',
        path: 'voice-to-text',
        element: <VoiceToTextPage />,
      },
      {
        id: 'Авторизация',
        path: 'auth',
        element: <AuthPage />,
      },
    ],
  },
];
