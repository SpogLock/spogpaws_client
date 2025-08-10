import { Button, Typography } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import React from 'react';
import { ICON_MAP, IconName } from './ui-utility';

interface OutlinedButtonProps extends Omit<ButtonProps, 'variant'> {
  text?: string;
  icon?: IconName | React.ReactNode; // Can be either a string name or custom icon
  children?: React.ReactNode;
  customColor?: string;
  textColor?: string;
}

export default function OutlinedButton({ 
  text, 
  icon, 
  children, 
  onClick,
  customColor,
  textColor,
  ...otherProps 
}: OutlinedButtonProps) {
  // Resolve icon - if it's a string, get from map, otherwise use as-is
  const resolvedIcon = typeof icon === 'string' && icon in ICON_MAP ? 
    React.createElement(ICON_MAP[icon as IconName]) : 
    icon;

  // If children is provided, use it (backward compatibility)
  // Otherwise, use text and icon props
  const content = children || (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: text && resolvedIcon ? '8px' : '0'
    }}>
      {resolvedIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{resolvedIcon}</span>}
      {text && <Typography variant="body2">{text}</Typography>}
    </div>
  );

  return (
    <Button variant="outlined" onClick={onClick} sx={{
      borderColor: customColor,
      color: textColor,
    }} {...otherProps}>
      {content}
    </Button>
  );
}