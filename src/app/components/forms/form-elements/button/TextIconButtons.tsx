import React from 'react';
import { Button, Stack, ButtonProps } from '@mui/material';

interface TextIconButtonProps extends ButtonProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  text?: string;
}

const TextIconButton = ({ 
  startIcon, 
  endIcon, 
  text, 
  sx, 
  ...rest 
}: TextIconButtonProps) => (
  <Button 
    sx={{
      p:0,
      color: 'primary.main',
      backgroundColor: 'transparent',
      width: 'fit-content',
      minWidth:'auto',
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'primary.main'
      },
      ...sx
    }}
    startIcon={startIcon}
    endIcon={endIcon}
    {...rest}
  >
    {text}
  </Button>
);

export default TextIconButton;