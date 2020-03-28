import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors';


interface ThemeLayoutPropsType {
  children:any
}

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});
export default function ThemeLayout({children}: ThemeLayoutPropsType) {
  return (
    <div >
      <ThemeProvider theme={outerTheme}>
        {children}
      </ThemeProvider>
    </div>
  );
}
