import { Button, Typography } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import React from 'react';
import { ICON_MAP, IconName } from './ui-utility';

interface FilledButtonProps extends Omit<ButtonProps, 'variant'> {
  text?: string;
  icon?: IconName | React.ReactNode;
  customColor?: string;
  borderColor?: string;
  textColor?: string;
  children?: React.ReactNode;
}

export default function FilledButton({
  text,
  icon,
  children,
  onClick,
  customColor,
  borderColor,
  textColor,
  ...otherProps
}: FilledButtonProps) { 
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
    <Button variant="contained" onClick={onClick} sx={{
      backgroundColor: customColor,
      borderColor: borderColor,
      color: textColor,
        '&:hover': {
        backgroundColor: customColor,
        borderColor: borderColor,
        color: textColor,
      },
    }} {...otherProps}>
      {content}
    </Button>
  );
}