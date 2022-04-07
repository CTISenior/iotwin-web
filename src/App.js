import "./App.css";
import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import Layout from "./components/Layout";
import { ThemeProvider } from "@emotion/react";
import customTheme from './theme';


function App() {

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
      <ThemeProvider theme={customTheme}>
        <Layout />
      </ThemeProvider>
    </ReactKeycloakProvider>

  );
}

export default App;