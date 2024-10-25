const protobuf = require('protobufjs');
const axios = require('axios');
const Long = require('long');
const readline = require("readline-sync");
// Discord token
var DISCORD_TOKEN = readline.question("Input a Discord Token:\n");
console.log("Discord Token:", DISCORD_TOKEN);
const root = protobuf.Root.fromJSON({
    nested: {
        UserSettings: {
            fields: {
                guildFolders: { rule: "repeated", type: "GuildFolder", id: 2 }
            }
        },
        GuildFolder: {
            fields: {
                id: { type: "uint32", id: 1 },
                guildIds: { rule: "repeated", type: "uint64", id: 2 },
                name: { type: "string", id: 3 },
                color: { type: "uint32", id: 4 }
            }
        }
    }
});

const UserSettings = root.lookupType("UserSettings");

(async () => {
    const settingsPayload = {
        guildFolders: [
            {
                id: 1,
                guildIds: [
                    Long.fromString('123456789012345678'),
                    Long.fromString('987654321098765432')
                ],
                name: 'My Folder',
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
        console.log('Pwnd >:3c', response.data);
    } catch (error) {
        console.error('Error pwning ): :', error.response ? error.response.data : error.message);
    }
})();
