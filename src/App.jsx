import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import HomePage from './homePage';
import NavBar from './layout/navbar';
import EmailComposeScreen from './layout/email-compose';
import FullscreenView from './layout/fullscreen-preview';

import { fetchEmailsByFolder } from './features/email/email.slice';

import './styles.css';

const App = () => {
  const dispatch = useDispatch();
  const { currentFolder } = useSelector((state) => state.email.thread);

  useEffect(() => {
    dispatch(fetchEmailsByFolder(currentFolder));
  }, [currentFolder]);

  return (
    <div className='h-screen overflow-y-hidden text-sm text-black dark:bg-customDark dark:text-customDarkText'>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/compose'
            caseSensitive
            element={<EmailComposeScreen />}
          />
          <Route path='/email/:id' caseSensitive element={<FullscreenView />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
