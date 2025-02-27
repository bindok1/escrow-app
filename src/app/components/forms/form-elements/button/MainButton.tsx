import { Button, ButtonProps } from '@mui/material';

interface MainButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const MainButton = ({ children, ...props }: MainButtonProps) => (
  <Button
    variant="contained"
    color="primary"
    size="large"
    sx={{
      borderRadius: 2,
      textTransform: 'none',
      py: 1.5,
      px: 4,
      fontSize: '1rem',
      fontWeight: 600,
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      }
    }}
    {...props}
  >
    {children}
  </Button>
);

export default MainButton;