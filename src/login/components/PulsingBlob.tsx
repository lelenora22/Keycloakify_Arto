import { Box, useTheme, keyframes } from '@mui/material';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
`;

export default function PulsingBlob() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '-5%',
        bottom: '-5%',
        right: '-5%',
        left: '-5%',
        borderRadius: '9999px',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.2,
        filter: 'blur(24px)',
        animation: `${pulse} 2s infinite`,
      }}
    />
  );
}
