import type {FunctionComponent} from 'react';
import NoSsr from '@mui/material/NoSsr';
import {BsMoon} from '@react-icons/all-files/bs/BsMoon';
import {BsSun} from '@react-icons/all-files/bs/BsSun';
import useDarkMode from 'use-dark-mode';

const DarkModeToggle: FunctionComponent = () => {
  const {value: isDarkMode, toggle} = useDarkMode();

  return (
    <NoSsr>
      <div onClick={toggle} role="presentation">
        {isDarkMode ? (
          <BsMoon fill="white" size={29} />
        ) : (
          <BsSun fill="orange" size={28} />
        )}
      </div>
    </NoSsr>
  );
};

export default DarkModeToggle;
