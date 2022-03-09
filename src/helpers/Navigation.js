import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

const Navigation = () => {
  const { keycloak } = useKeycloak();
  const isObserver = keycloak.hasRealmRole("observer");
  const isAdmin = keycloak.hasRealmRole("admin");
  const isCreator = keycloak.hasRealmRole("creator");

  if (isAdmin || isObserver)
    return <Navigate to={"/dashboard"} />
  else if (isCreator)
    return <Navigate to={"/devices"} />
  else
    return null;
};

export default Navigation;