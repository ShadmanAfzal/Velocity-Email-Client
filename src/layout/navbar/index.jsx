import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/auth/auth.slice.js';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { DarkModeToggle } from './components/darkModeToggle.jsx';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <nav className='mb-2 flex h-12 items-center justify-between px-4 shadow dark:shadow-customDarkShadow'>
      <Link to='/'>
        <div className='flex cursor-pointer items-center gap-1 text-xl'>
          <MdOutlineMarkEmailRead />
          <div>Velocity</div>
        </div>
      </Link>
      <div className='flex items-center gap-1'>
        <DarkModeToggle />
        <FiUser size={18} />
        {user.name}
      </div>
    </nav>
  );
};

export default NavBar;
