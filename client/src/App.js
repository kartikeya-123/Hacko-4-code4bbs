import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './mixins/chartjs';
import routes from './routes';
import Wrapper from './Containers/Wrapper';
import { CookiesProvider, withCookies } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </CookiesProvider>
  );
};
export default withCookies(App);
