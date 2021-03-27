import React from "react";
import { CookiesProvider, withCookies } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";

import Wrapper from "./Containers/Wrapper";

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
