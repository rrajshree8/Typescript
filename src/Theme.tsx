
import React from 'react';
import { useColorMode, IconButton, IconButtonProps, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

interface ThemeSwitcherProps extends Omit<IconButtonProps, 'aria-label'> {
  'aria-label': string;
  'size':any;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 'aria-label': ariaLabel,'size':size, ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const iconColor = useColorModeValue('gray.700', 'yellow.500');

  return (
    <IconButton
      aria-label={ariaLabel}
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <FaMoon size={size}  color={iconColor} /> : <FaSun size={size} color={iconColor} />}
      variant="ghost"
       
      {...rest}
    />
  );
};

export default ThemeSwitcher;
