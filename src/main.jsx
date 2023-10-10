import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/app.scss";
import { createContext } from "react";

// Remember to import useState from react.

export const server = "https://the-reminder-app.onrender.com/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,  
      }}
    >
      <App />
    </Context.Provider>
  );
};
// Whatever we provide in context provider can be used in that context without importing and exporting . Like here we are calling this context provider function ie AppWrapper fn in the ReactDom so we can use this fn in any file here .

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
