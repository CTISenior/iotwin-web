import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "tbiot-keycloak",
 clientId: "Tbiot-auth",
});

export default keycloak;