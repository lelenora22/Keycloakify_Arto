import { GlobalStyles as MUIGlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';
 
const GlobalStyles = () => {
  const theme = useTheme();
  return (
    <MUIGlobalStyles
      styles={{
         body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          margin: 0,
          fontFamily: theme.typography.fontFamily,
        },
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: theme.palette.background.default,
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.main,
          borderRadius: '10px',
        },
      }}
    />
  );
};
 
export default GlobalStyles;
 
 