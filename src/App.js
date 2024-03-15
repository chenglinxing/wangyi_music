import React, { memo } from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";

import routes from "./router";

import Header from "./components/app-header";
import Footer from "./components/app-footer";

const App = memo(() => {
  return (
    <HashRouter>
      <Header />
      {renderRoutes(routes)}
      <Footer></Footer>
    </HashRouter>
  );
});

export default App;
