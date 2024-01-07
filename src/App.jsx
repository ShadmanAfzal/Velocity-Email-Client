import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import HomePage from './homePage';
import NavBar from './layout/navbar';
import EmailComposeScreen from './layout/email-compose';
import FullscreenView from './layout/fullscreen-preview';

import { fetchEmailsByFolder } from './features/email/email.slice';

import './styles.css';

const App = () => {
  const dispatch = useDispatch();
  const { currentFolder } = useSelector((state) => state.email.thread);

  const router = createHashRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/compose',
      caseSensitive: true,
      element: <EmailComposeScreen />,
    },
    {
      path: '/email/:id',
      caseSensitive: true,
      element: <FullscreenView />,
    },
  ]);

  useEffect(() => {
    dispatch(fetchEmailsByFolder(currentFolder));
  }, [currentFolder]);

  return (
    <div className='text-black h-screen overflow-y-hidden text-sm dark:bg-customDark dark:text-customDarkText'>
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
