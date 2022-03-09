import React from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { BrowserRouter, Route, Routes, Switch, Link, Navigate } from "react-router-dom";

const Sidebar = () => {
    const { keycloak, initialized } = useKeycloak();
    return (
        <div>
            <div className="bg-white border" id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold border-bottom">IoTwin </div>
                <div className="list-group list-group-flush my-3">

                    {!!keycloak.hasRealmRole("admin") && (
                        <div>
                            <a href="/dashboard" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                                className="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                            <a href="/devices" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-fire-alt me-2"></i>Devices</a>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-building me-2"></i>Buildings</a>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-cogs me-2"></i>Settings</a>
                        </div>

                    )
                    }
                    {!!keycloak.hasRealmRole("creator") && (
                        <div>
                            <a href="/devices" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-fire-alt me-2"></i>Devices</a>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-building me-2"></i>Buildings</a>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-cogs me-2"></i>Settings</a>
                        </div>
                    )
                    }
                    {!!keycloak.hasRealmRole("observer") && (
                        <div>
                            <a href="/dashboard" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                                className="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-cogs me-2"></i>Settings</a>
                        </div>
                    )
                    }
                    {!!keycloak.authenticated && (

                        <button

                            type="button"
                            className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
                            onClick={() => keycloak.logout()}

                        >
                            <i
                                className="fas fa-power-off me-2"></i>Logout ({keycloak.tokenParsed.preferred_username})

                        </button>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;