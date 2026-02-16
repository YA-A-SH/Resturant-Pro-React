import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "@user/RTK/store.jsx";
import { Provider } from "react-redux";
import "@else/Components/i18n.js";
import ScrollToTop from "@else/Components/Routes/ScrollToTop.jsx";
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
