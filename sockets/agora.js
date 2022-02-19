const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
// import * as dotenv from "dotenv";
// dotenv.config();
// Rtc Examples
const appID = '365b7eacbfa849b7b072234937adf729';
const appCertificate = '5f18e2c211214637956d97ae2453dff1';
const role = RtcRole.PUBLISHER;

class Agora {

    resourceId;

    async generateToken(channelName) {
        // Build token with uid
        const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, 0, role);
        return tokenA;
    }
}

module.exports = Agora;