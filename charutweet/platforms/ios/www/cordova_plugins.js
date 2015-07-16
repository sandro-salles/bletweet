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
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "at.modalog.cordova.plugin.cache": "1.0.0",
    "com.megster.cordova.bluetoothserial": "0.4.3",
    "com.randdusing.bluetoothle": "2.1.0"
}
// BOTTOM OF METADATA
});