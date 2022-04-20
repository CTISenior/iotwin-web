import Keycloak from "keycloak-js";
import conf from "./conf.json"
const keycloak = new Keycloak({
    url: conf.keycloak.IP + ":" + conf.keycloak.PORT + "/auth",
    realm: window.location.hostname.split(".")[0],
    clientId: conf.keycloak.clientId,
});

export default keycloak;