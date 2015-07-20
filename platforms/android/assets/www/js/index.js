/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    device_addresses: ["00:1D:AE:40:24:91"],
    twitter_credentials: null,
    baby_gender: null,
    daddy_mood: null,
    available_moods = ['mood1','mood2','mood3'],

    tweets: {
        male: {
            mood1: [
                "Parabéns [friend_screenname] pelo lindo filhão! Feliz dia dos pais :)",
                "As garotas que se cuidem, o menino do [friend_screenname] acabou de chegar ;) Feliz dia dos pais!"
            ],
            mood2: [
                "Parabéns [friend_screenname] pelo lindo filhão! Feliz dia dos pais :)",
                "As garotas que se cuidem, o menino do [friend_screenname] acabou de chegar ;) Feliz dia dos pais!"
            ],
            mood3: [
                "Parabéns [friend_screenname] pelo lindo filhão! Feliz dia dos pais :)",
                "As garotas que se cuidem, o menino do [friend_screenname] acabou de chegar ;) Feliz dia dos pais!"
            ]
        },
        female: {
            mood1: [
                "Parabéns [friend_screenname] pelo lindo filhão! Feliz dia dos pais :)",
                "As garotas que se cuidem, o menino do [friend_screenname] acabou de chegar ;) Feliz dia dos pais!"
            ],
            mood2: [
                "Parabéns [friend_screenname] pelo lindo filhão! Feliz dia dos pais :)",
                "As garotas que se cuidem, o menino do [friend_screenname] acabou de chegar ;) Feliz dia dos pais!"
            ],
            mood3: [
                "Parabéns [friend_screenname] pelo lindo filhão! Feliz dia dos pais :)",
                "As garotas que se cuidem, o menino do [friend_screenname] acabou de chegar ;) Feliz dia dos pais!"
            ]
        }
    },

    _discovery_timeout_id: null,
    _discovery_timeout_timeout: 300, // interval between each discovery round (in miliseconds)
    _discovery_stopped: false, // true when user clicks on finish button

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        bluetoothSerial.setDeviceDiscoveredListener = app.hack_override_setDeviceDiscoveredListener;

        var deviceready = document.getElementById(id);
        $('.listening').hide();
        $('.received').show();

        console.log('Received Event: ' + id);

        $("#actions a").click(function(){
            location.reload();
        });

        $("#picture").click(function(){
            $("#actions").toggle();
        });

        $("#friend-detail #cancel").click(function(){
            $("#friend-detail").hide();
        });

        $("#friend-detail #confirm").click(function(){
            app.twitter_friend = $("#friend-screenname").text();
            $("#friend-pick, #friend-list-container, #friend-detail").hide();
            $("#gender-pick, #gender-list").show();
        });

        $("input[name='baby-gender']").change(function(){
            app.baby_gender = $(this).val();
            $("#finish-setup").show();
            $("#gender-pick, #gender-list").hide();
        });

        $("#finish-setup").click(
            function() {
                $(this).hide();
                app.display("CADASTRO FINALIZADO COM SUCESSO!");
                $("#start-discovery").show();
            }
        );

        $("#start-discovery").click(
            function() {
                bluetoothSerial.isEnabled(app.bluetooth_is_enabled, app.bluetooth_is_disabled)
            }
        );

        $("#stop-discovery").click(
            function(){
                app.bluetooth_stop_discovery();
            }
        );

        $("#twitter-connect").click(
            function () {

                $(this).addClass("blink").text("AGUARDE, INICIANDO A CONEXÃO...");
                TwitterClient.login(app.twitter_login_success, app.twitter_login_failure);

                return false;
            }
        );


        $("#message").show();

    },
    display: function(message) {
        console.log(JSON.stringify(message));
        $("#message").text(message);
    },

    /*
        Twitter related functions and callbacks
    */
    twitter_login_success: function(result) {
        $("#twitter-connect").hide();
        $("#friend-pick").show();
        app.display('Successful login!');
        app.twitter_credentials = result;

        $("#picture").css("background-image","url('" + result.profileImageUrl.replace("_normal","") + "')");
        $("#profile").show();

        TwitterClient.getFriendsList(app.twitter_friends_success, app.twitter_friends_failure);

        $("#twitter-connect").removeClass("blink").text("TWITTER CONNECT");

    },
    twitter_login_failure: function(error) {
        app.display('Error logging in. Please try again...');
        $("#twitter-connect").removeClass("blink").text("TWITTER CONNECT");
    },
    twitter_friends_success: function(result) {
        app.display('Successful loaded friends!');

        $(result).each(
            function(){
                $('<a/>', {
                    id: this.screenName,
                    text: this.name,
                    style: "background-image: url('" + this.profileImageUrl.replace("_normal","") + "');"
                }).appendTo('#friend-list-container .carousel');
            }
        );



        $("#friend-list-container .carousel").owlCarousel({
            items : 4,
            singleItem : false,
            pagination: false,
            navigation: false,
            afterInit: function() {
                    $(".owl-item a").click(function(){
                            $("#friend-detail #friend-picture").css("background-image", $(this).css("background-image"));
                            $("#friend-detail #friend-name").text(this.text);
                            $("#friend-detail #friend-screenname").text("@" + this.id);
                            $("#friend-detail").show();
                        }
                    );

                    $("#friend-pick").removeClass("blink").text("ESCOLHA UM AMIGO");
                    $("#friend-list-container").show();
                }
            }
        );

    },
    twitter_friends_failure: function(error) {
        app.display('Error loading friends');
        app.display(error);
    },
    twitter_send_random_tweet: function() {
        var random = Math.floor((Math.random() * (app.tweets[app.baby_gender].length -1 )) + 0);
        var tweet = app.tweets[app.baby_gender][random];
        //tweet = tweet.replace("[friend_screenname]", app.twitter_friend);

        console.log("Random tweet: " + tweet);

        TwitterClient.updateStatus(tweet, app.twitter_update_status_success, app.twitter_update_status_failure);
    },
    twitter_update_status_success: function(result) {
        console.log(result);
    },
    twitter_update_status_failure: function(error) {
        console.log(error);
    },

    /*
        QRCODE Scan related functions and callbacks
    */
    qrcode_scan_success: function (result) {

        if(result.format == "QR_CODE" && result.text.indexOf("huggies-pais") > -1) {
            app.device_address = result.text.split("|")[1];
            app.display("Device reconhecido (" + app.device_address + ")");
            $("#twitter-connect").show();
            $("#scan-qrcode").hide();
        } else {
            app.display("Device não reconhecido! Tente novamente.");
        }

        $("#scan-qrcode").removeClass("blink").text("SCAN QRCODE");
    },
    qrcode_scan_failure: function (error) {
        app.display("Scanning failed: " + error);
        $("#scan-qrcode").removeClass("blink").text("SCAN QRCODE");
    },

    /*
        Bluetooth related functions and callbacks
    */
    bluetooth_start_discovery: function() {

        if (app._discovery_stopped) {
            window.clearTimeout(app._discovery_timeout_id);
            app._discovery_stopped = false;
            return;
        }
        else {
            app._discovery_timeout_id = window.setTimeout(

                function() {

                    if (app._discovery_stopped) {
                        window.clearTimeout(app._discovery_timeout_id);
                        app._discovery_stopped = false;
                        return;
                    }

                    $("#start-discovery").hide();
                    $("#finish-discovery").show();
                    app.display("Buscando o sinal do device...");
                    bluetoothSerial.setDeviceDiscoveredListener(app.bluetooth_on_device_discovered);
                    bluetoothSerial.discoverUnpaired(app.bluetooth_discovery_finished_success, app.bluetooth_discovery_finished_failure);
                },
                app._discovery_timeout_timeout
            );
        }
    },
    bluetooth_stop_discovery: function() {
        app._discovery_stopped = true;
        bluetoothSerial.clearDeviceDiscoveredListener();
        window.clearTimeout(app._discovery_timeout_id);
    },
    bluetooth_discovery_finished_success: function(devices) {
        $("#start-discovery").show();
        $("#finish-discovery").hide();
        app.bluetooth_start_discovery();
    },
    bluetooth_discovery_finished_failure: function(error) {
        console.log(error);
        app.bluetooth_start_discovery();
    },
    bluetooth_is_enabled: function() {
        app.bluetooth_start_discovery();
    },
    bluetooth_on_device_discovered: function(device) {
        if(device.address == app.device_address) {
            app.display("SINAL RECONHECIDO... ENVIANDO TWEET!");
            app.bluetooth_stop_discovery();

            $("#start-discovery").hide();
            $("#finish-discovery").hide();

            app.twitter_send_random_tweet();

        }

        console.log(device);
    },
    bluetooth_enable_success: function() {
        app.bluetooth_start_discovery();
    },
    bluetooth_enable_failure: function() {
        app.display("Não foi possível habilitar o bluetooth... por favor tente novamente!");
    },
    bluetooth_is_disabled: function(){
        app.display("Bluetooth is disabled, please enable first!");
        bluetoothSerial.enable(app.bluetooth_enable_success, app.bluetooth_enable_failure);
    },


    hack_override_setDeviceDiscoveredListener: function (notify) {
          if (typeof notify != 'function')
              throw 'BluetoothSerial.setDeviceDiscoveredListener: Callback not a function'

          cordova.exec(notify, null, "BluetoothSerial", "setDeviceDiscoveredListener", []);
      },

};


