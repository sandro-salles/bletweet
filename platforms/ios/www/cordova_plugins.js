cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/at.modalog.cordova.plugin.cache/www/Cache.js",
        "id": "at.modalog.cordova.plugin.cache.Cache",
        "clobbers": [
            "cache"
        ]
    },
    {
        "file": "plugins/com.megster.cordova.bluetoothserial/www/bluetoothSerial.js",
        "id": "com.megster.cordova.bluetoothserial.bluetoothSerial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "file": "plugins/com.randdusing.bluetoothle/www/bluetoothle.js",
        "id": "com.randdusing.bluetoothle.bluetoothle",
        "clobbers": [
            "bluetoothle"
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
        "file": "plugins/br.com.snippet.cordova.volumehijack/www/volumehijack.js",
        "id": "br.com.snippet.cordova.volumehijack.volumehijack",
        "clobbers": [
            "volumehijack"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "at.modalog.cordova.plugin.cache": "1.0.0",
    "com.megster.cordova.bluetoothserial": "0.4.3",
    "com.randdusing.bluetoothle": "2.1.0",
    "com.megster.cordova.ble": "0.1.9",
    "br.com.snippet.cordova.volumehijack": "0.0.1"
}
// BOTTOM OF METADATA
});