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
import Navigation from './helpers/Navigation';
import Layout from "./components/Layout";


function App() {
  // return (
  //   <div className="d-flex" id="wrapper">
  //     <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
  //       <BrowserRouter>
  //         <Sidebar />
  //         <Routes>
  //           <Route path="/" element={<>
  //             <Navigation />
  //           </>
  //           } />
  //           <Route path="/devices" element={<>
  //             <PrivateRoute>
  //               <Devices />
  //             </PrivateRoute>
  //           </>
  //           } />
  //           <Route path="/dashboard" element={<>
  //             <PrivateRoute>
  //               <Dashboard />
  //             </PrivateRoute>
  //           </>
  //           } />
  //         </Routes>
  //       </BrowserRouter>
  //     </ReactKeycloakProvider>
  //   </div>
  // );
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
      <Layout />
    </ReactKeycloakProvider>

  );
}

export default App;