import React, { memo } from "react";
import { Provider } from "react-redux"
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";

import routes from "./router";
import store from "./store";

import Header from "./components/app-header";
import Footer from "./components/app-footer";

const App = memo(() => {
  return (
    <Provider store={store}>
    <HashRouter>
      <Header />
      {renderRoutes(routes)}
      <Footer></Footer>
    </HashRouter>
    </Provider>
  );
});

export default App;
