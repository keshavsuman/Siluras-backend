const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
// import * as dotenv from "dotenv";
// dotenv.config();
// Rtc Examples
const appID = 'ad4b7311c7ed4ddaa17c14184dd3c2be';
const appCertificate = 'a63bf26a84d64783b47b9e7352e8fd23';
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