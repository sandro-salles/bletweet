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
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
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
        "file": "plugins/com.phonegap.plugins.barcodescanner/www/barcodescanner.js",
        "id": "com.phonegap.plugins.barcodescanner.BarcodeScanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "file": "plugins/br.com.snippet.cordova.twitterclient/www/TwitterClient.js",
        "id": "br.com.snippet.cordova.twitterclient.TwitterClient",
        "clobbers": [
            "TwitterClient"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "br.com.snippet.cordova.volumehijack": "0.0.1",
    "cordova-plugin-whitelist": "1.0.0",
    "com.megster.cordova.ble": "0.1.9",
    "cordova-plugin-inappbrowser": "1.0.2-dev",
    "com.megster.cordova.bluetoothserial": "0.4.3",
    "com.phonegap.plugins.barcodescanner": "2.0.1",
    "br.com.snippet.cordova.twitterclient": "0.1.0"
}
// BOTTOM OF METADATA
});