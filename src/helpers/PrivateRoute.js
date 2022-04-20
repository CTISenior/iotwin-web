import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;
    const isObserver = keycloak.hasRealmRole("observer");
    const isAdmin = keycloak.hasRealmRole("admin");
    const isCreator = keycloak.hasRealmRole("creator");
    if (window.location.pathname === "/dashboard") {
        return (isAdmin || isObserver) ? children : null;
    } else if (window.location.pathname === "/devices") {
        return (isAdmin || isCreator) ? children : null;
    } else if (window.location.pathname === "/assets") {
        return (isAdmin || isCreator) ? children : null;
    }
};

export default PrivateRoute;