import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

const Navbar = ({ children }) => {
    const { keycloak } = useKeycloak();
    const isObserver = keycloak.hasRealmRole("observer");
    const isAdmin = keycloak.hasRealmRole("admin");
    const isCreator = keycloak.hasRealmRole("creator");

    if (isAdmin) {
        return (
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                    <div className='d-lg-none'>
                        <a href="/dashboard" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                            className="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                        <a href="/devices" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-fire-alt me-2"></i>Devices</a>
                        <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-building me-2"></i>Buildings</a>
                        <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-cogs me-2"></i>Settings</a>
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
                        }</div>
                </ul>
            </div>
        )
    }
    else if (isCreator) {
        return (
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                    <div className='d-lg-none'>
                        <a href="/devices" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-fire-alt me-2"></i>Devices</a>
                        <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-building me-2"></i>Buildings</a>
                        <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-cogs me-2"></i>Settings</a>
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
                        }</div>
                </ul>
            </div>
        )
    }
    else if (isObserver) {
        return (
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                    <div className='d-lg-none'>
                        <a href="/dashboard" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                            className="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                        <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-cogs me-2"></i>Settings</a>
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
                        }</div>
                </ul>
            </div>
        )
    } else
        return null;
};

export default Navbar;