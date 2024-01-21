import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setTheme, toggleTheme } from '../../../features/ui/ui.slice';

import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { CustomToolTip } from '../../../components/customToolTip';

export const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(setTheme());
  }, []);

  return (
    <div>
      <DarkModeSwitch
        checked={isDark}
        onChange={(checked) => dispatch(toggleTheme(checked))}
        color={isDark ? 'white' : 'black'}
        sunColor='white'
        moonColor='white'
        size={18}
        className='mx-2'
        data-tooltip-id='theme-tooltip'
        data-tooltip-content='Toggle Theme'
        data-tooltip-place='top'
      />
      <CustomToolTip id='theme-tooltip' />
    </div>
  );
};
