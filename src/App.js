import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes, Switch, Link, Navigate } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import Devices from "./components/Devices";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="d-flex" id="wrapper">
      <ReactKeycloakProvider authClient={keycloak}>
        <BrowserRouter>
          <Sidebar />
          <Routes> 
            <Route exact path="/" element={<>
            <Welcome/>
            </>
            } />
            <Route path="/devices" element={<>
              <PrivateRoute>
                <Devices />
              </PrivateRoute>
            </>
            } />
            <Route path="/dashboard" element={<>
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </>
            } />
               <Route path="/welcome" element={<>
              <Welcome/>
            </>
            } />
          </Routes>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;