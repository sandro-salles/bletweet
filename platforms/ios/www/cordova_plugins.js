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
        "file": "plugins/com.megster.cordova.ble/www/ble.js",
        "id": "com.megster.cordova.ble.ble",
        "clobbers": [
            "ble"
        ]
    },
    {
        "file": "plugins/com.megster.cordova.bluetoothserial/www/bluetoothSerial.js",
        "id": "com.megster.cordova.bluetoothserial.bluetoothSerial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "br.com.snippet.cordova.volumehijack": "0.0.1",
    "com.megster.cordova.ble": "0.1.9",
    "com.megster.cordova.bluetoothserial": "0.4.3"
}
// BOTTOM OF METADATA
});