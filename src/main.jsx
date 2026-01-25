import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Project/User/RTK/store.jsx";
import { Provider } from "react-redux";
import "./Project/Else/Components/i18n.js";
import ScrollToTop from "./Project/User/Routes/ScrollToTop.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
