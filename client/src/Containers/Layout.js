import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './../components/GlobalStyles.js';
import './../mixins/chartjs';
import theme from './../theme';
import setUserAsProps from './../routes';

const Layout = (props) => {
  const routes = setUserAsProps(props.user, props.cookies);
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default Layout;
