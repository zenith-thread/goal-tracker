import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// React Router
import { BrowserRouter } from "react-router";

// Redux toolkit
import { Provider } from "react-redux";
import { store } from "./store/store.js";

// MUI
import { CustomThemeProvider } from "./theme/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
