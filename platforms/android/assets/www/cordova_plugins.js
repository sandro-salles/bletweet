cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/br.com.snippet.cordova.volumehijack/www/volumehijack.js",
        "id": "br.com.snippet.cordova.volumehijack.volumehijack",
        "clobbers": [
            "volumehijack"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.megster.cordova.ble/www/ble.js",
        "id": "com.megster.cordova.ble.ble",
        "clobbers": [
            "ble"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "br.com.snippet.cordova.volumehijack": "0.0.1",
    "cordova-plugin-whitelist": "1.0.0",
    "com.megster.cordova.ble": "0.1.9"
}
// BOTTOM OF METADATA
});