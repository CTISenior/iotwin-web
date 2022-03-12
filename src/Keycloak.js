import Keycloak from "keycloak-js";
import conf from "./conf.json"
const keycloak = new Keycloak({
    url: conf.keycloak.IP + ":" + conf.keycloak.PORT + "/auth",
    realm: conf.keycloak.realm,
    clientId: conf.keycloak.clientId,
});

export default keycloak;