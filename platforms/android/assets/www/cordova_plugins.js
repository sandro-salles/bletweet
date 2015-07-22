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
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/android/notification.js",
        "id": "org.apache.cordova.dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "id": "org.apache.cordova.vibration.notification",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/www/Toast.js",
        "id": "nl.x-services.plugins.toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/test/tests.js",
        "id": "nl.x-services.plugins.toast.tests"
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
    "com.megster.cordova.bluetoothserial": "0.4.3",
    "com.phonegap.plugins.barcodescanner": "2.0.1",
    "org.apache.cordova.network-information": "0.2.15",
    "org.apache.cordova.dialogs": "0.3.0",
    "org.apache.cordova.vibration": "0.3.13",
    "nl.x-services.plugins.toast": "2.0.4",
    "br.com.snippet.cordova.twitterclient": "0.1.0"
}
// BOTTOM OF METADATA
});