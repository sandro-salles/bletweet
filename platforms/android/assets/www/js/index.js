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

    TOAST_SHORT: "short",
    TOAST_LONG: "long",
    GENDER_MALE: "male",
    GENDER_FEMALE: "female",

    STATUS_RUNNING: "running",
    STATUS_PAUSED: "paused",
    STATUS_RESUMED: "resumed",

    STATUS_BT_UNINITIALIZED: "uninitialized",
    STATUS_BT_AWAITING: "awaiting",
    STATUS_BT_DISCOVERING: "discovering",
    STATUS_BT_STOPPED: "stopped",

    BT_FLAME_PARAMS: {
        speed: 137,
        maxPow: -1,
        minPow: 4,
        gravity: 5,
        flameWidth: 0,
        flameHeight: 1,
        fadingFlameSpeed: 2,
        fireTransparency: 100,
        globalTransparency: 0,
        yOffset: 0,
        plasm: false,
        cartoon: true,
        maxPowZone: "uniform",
        burnBorders: false,
        steps: 120
    },

    BT_FLAME_ON_TWEET_PARAMS: {
        plasm: true,
        fireTransparency: 70
    },

    BT_FLAME_ON_AFTER_TWEET_PARAMS: {
        plasm: false,
        fireTransparency: 100
    },

    BT_FLAME_UP_MAX_POW: 7,
    BT_FLAME_DOWN_MAX_POW: -1,
    BT_FLAME_CHANGE_TIMEOUT: 1,

    DEVICE_ADDRESSES: ["00:1D:AE:40:24:91"],
    MOODS: {
        blessed: { key: "blessed", name: "Abençoado" },
        happy: { key: "happy", name: "Feliz" },
        sick: { key: "sick", name: "Preocupado" },
        love: { key: "love", name: "Apaixonado" }
    },

    HASHTAG: "#huggiesdadcigar",

    BT_INTERVAL: 0, // interval between each discovery round (in miliseconds)

    TWEETS: {
        male: {
            blessed: [
                "Illicit caterpillar where notwithstanding across disbanded the after coughed hey.",
                "Therefore dashingly a misheard ladybug far crud one ravenously notwithstanding overthrew."
            ],
            happy: [
                "The objectively however wherever prodigious dachshund near adroitly.",
                "Alas and much some amiable and this inanimate."
            ],
            sick: [
                "Rabbit much excluding sudden besides wherever much jellyfish however.",
                "This far shot piranha and more this much lemur this drove plentiful more hey far and tearful alas."
            ],
            love: [
                "That a wailed overdid the thoughtfully that moronic and went goodness and goodness dreamed.",
                "Vulgar jeez exclusive swelled cut this because."
            ]
        },
        female: {
            blessed: [
                "Rapidly winked stared frighteningly indicative dazedly snugly measurable and cobra upset diverse lighted while.",
                "A much salmon gosh."
            ],
            happy: [
                "More hello rigorous impatiently flawless woodchuck less giraffe.",
                "So upon brilliant discarded unaccountably wherever."
            ],
            sick: [
                "Some before gauchely since pious more or and far overpaid mongoose redoubtably pending.",
                "Stringently articulately halfheartedly much haughty swanky much monstrously so dear cowered visually where less."
            ],
            love: [
                "Tiger understood and massive perceptibly darn jeepers giraffe gosh because and without among intensely komodo.",
                "Hello some the ladybug selfish more trod one much practicably and glared stopped hey much barring a after darn."
            ]
        }
    },

    config: { credentials: null, mood: null, gender: null, name: null },
    
    _discovery_timeout_id: null,    
    _application_status: null,
    _application_bt_status: null,
    _tmp_flame_up_interval_id: null,
    _tmp_flame_down_interval_id: null,
    

    // Application Constructor
    initialize: function() {

        app._application_status = app.STATUS_RUNNING;
        app._application_bt_status = app.STATUS_BT_UNINITIALIZED;
        app.config.mood = app.MOODS.blessed.key

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

        document.addEventListener("pause", app.on_pause, false);
        document.addEventListener("resume", app.on_resume, false);
        document.addEventListener("online", app.on_online, false);
        document.addEventListener("offline", app.on_offline, false);

        bluetoothSerial.setDeviceDiscoveredListener = app.hack_override_setDeviceDiscoveredListener;


        $('.listening').hide();

        $("#logout").bind(
            "touchend",
            function() {

                app.check_connection(
                    function() {

                         TwitterClient.logout(app.twitter_logout_success, app.twitter_logout_failure);
                    }
                );
            }
        );

        $("#config").bind(
            "touchend",
            function () {

                step(3);
            }
        );

        $("#profile span").bind(
            "touchend",
            function(){
                $("#actions").toggle("slow");
            }
        );

        $("#config-step ul input").bind(
            "change",
            function(){

                app.config.gender = $(this).val();

                var toast_text = "";

                if(app.config.gender == app.GENDER_MALE) {
                    toast_text = "OK, é um menino... qual é o nome dele?";
                } else {
                    toast_text = "OK, é uma menina... qual é o nome dela?";
                }

                app.toast(toast_text,app.TOAST_LONG);
            }
        );

        $("#discovery-step ul input").bind(
            "touchend",
            function(){

                app.config.mood = $(this).val();
                app.toast("Voce está se sentindo '" + app.MOODS[app.config.mood].name + "'");
            }
        );


        $("#lighter a").bind(
            "touchmove",
            function(){

                if (app._application_bt_status != app.STATUS_BT_DISCOVERING) {
                    app.bluetooth_start_discovery();    
                }
            
                return false;    
            }
        );

        $("#lighter canvas").bind(
            "touchmove",
            function(){

                if (app._application_bt_status != app.STATUS_BT_STOPPED) {
                    app.bluetooth_stop_discovery();    
                }
            
                return false;    
            }
        );


        $("#connect-step button").bind(
            "touchend",
            function() {

                app.check_connection(
                    function() {

                        app.toast(
                            "Aguarde enquanto iniciamos a conexão com o Twitter... (dependendo da sua conexão isso pode demorar alguns segundos)",
                            app.TOAST_LONG,
                            function() {

                                $("#connect-step button").addClass("disabled");
                                TwitterClient.login(app.twitter_login_success, app.twitter_login_failure);
                            }
                        );
                    }                    
                );

                return false;
            }            
        );


        $("#config-step button").bind(
            "touchend",
            function() {

                app.config.name = $("#name").val();

                app.toast(
                    "Tudo pronto! Assim que você quiser, basta enviar o sinal :)", 
                    app.TOAST_LONG, 
                    function() {

                        $("#config-step button").addClass("disabled");
                        app.step(3);
                        app.bluetooth_start_discovery();
                    }
                );
            }
        );

        $('#lighter canvas').fire(app.BT_FLAME_PARAMS);

        step(1);
         

    },
    on_pause: function() {

        app._application_status = app.STATUS_PAUSED;
    },
    on_resume: function() {

        app._application_status = app.STATUS_RESUMED;
    },
    on_online: function() {

        app.toast("Agora você está conectado a internet! :)");
    },
    on_offline: function() {

        app.toast("Parece que você não está conectado a internet... :(");

        if(app._application_bt_status != app.STATUS_BT_UNINITIALIZED) {
            app.bluetooth_stop_discovery();
        }
    },
    check_connection: function(callback) {

        var connection_type = navigator.connection.type;

        if (connection_type == Connection.NONE) {
            app.toast("Parece que você não está conectado a internet. Por favor conecte-se e tente novamente!");
        }
        else {
            callback();
        }
    },
    message: function(message) {

        $("#message").html(message).show();
    },
    toast: function(message, duration, callback) {

        var success_callback = (callback && typeof callback == "function") ? callback : app.on_toast_success

        if (!duration || duration == app.TOAST_SHORT) {
            window.plugins.toast.showShortBottom(message, success_callback, app.on_toast_failure);
        } else {
            window.plugins.toast.showLongBottom(message, success_callback, app.on_toast_failure);
        }
    },
    on_toast_success: function(result) {
        //console.log(result);
    },
    on_toast_failure: function(error) {
        //console.log(error);
    },
    step: function(num) {
        
        if (num == 1) {
            $("#steps").css("left","0px");
            app.step = 1;

            return;
        } 

        if (num == 2) {
            $("#steps").css("left","-360px");
            app.step = 2;      

            return;
        } 

        if (num == 2) {
            $("#steps").css("left","-720px");        
            app.step = 3;

            return;
        }        
    },

    /*
        Twitter related functions and callbacks
    */
    twitter_login_success: function(result) {

        app.config.credentials = result;
        app.config.credentials.profileImageUrl = app.config.credentials.profileImageUrl.replace("_normal","");

        app.toast("Parabéns " + app.config.credentials.name + ", agora diga qual é o sexo do bebê...", app.TOAST_LONG);

        $("#profile span").css("background-image","url('" + app.config.credentials.profileImageUrl + "')");
        $("#profile").show();

        app.step(2);
    },
    twitter_login_failure: function(error) {

        console.log(error);
        $("#connect-step button").removeClass("disabled");
        app.toast('Houve um problema na conexão com o Twitter. Por favor tente novamente...', app.TOAST_LONG);
    },
    twitter_logout_success: function(result) {

        console.log(result);
        app.toast(
            "Usuário desconectado com sucesso!", 
            app.TOAST_SHORT, 
            function() {

                step(1);
                location.reload();
            }
        );
    },
    twitter_logout_failure: function(error) {

        console.log(error);
        app.toast('Houve um problema na desconexão da sua conta. Por favor tente novamente...', app.TOAST_LONG);
    },
    twitter_send_random_tweet: function() {

        var tweets = app.TWEETS[app.config.gender][app.config.mood];        
        var random = Math.floor((Math.random() * (tweets.length -1 )) + 0);
        var tweet = tweets[random];
        tweet = tweet + " " + app.HASHTAG;

        TwitterClient.updateStatus(tweet, app.twitter_update_status_success, app.twitter_update_status_failure);
    },
    twitter_update_status_success: function(result) {

        var tweet = JSON.parse(result);
        app.message("Tweet enviado! <a href='https://twitter.com/" + app.config.credentials.screenName + "/status/" + tweet.id_str + "'>Dá só uma olhada nele...</a>");

        $('#lighter canvas').fire("change", app.BT_FLAME_ON_AFTER_TWEET_PARAMS);
    },
    twitter_update_status_failure: function(error) {

        console.log(error);
    },

    /*
        Bluetooth related functions and callbacks
    */
    bluetooth_flame_light_down: function() {
        
        var max_pow = app.BT_FLAME_UP_MAX_POW; 

        app._tmp_flame_down_interval_id = window.setInterval(
            function() { 

                if(max_pow==app.BT_FLAME_DOWN_MAX_POW) {
                    window.clearInterval(app._tmp_flame_down_interval_id); 
                    return 
                } 

                max_pow--;

                $('#lighter canvas').fire("change", { maxPow: max_pow }); 
            }
        , app.BT_FLAME_CHANGE_TIMEOUT);
    },
    bluetooth_flame_light_up: function() {
        
        var max_pow = app.BT_FLAME_DOWN_MAX_POW; 

        app._tmp_flame_up_interval_id = window.setInterval(
            function() { 

                if(max_pow==app.BT_FLAME_UP_MAX_POW) {
                    window.clearInterval(app._tmp_flame_up_interval_id); 
                    return 
                } 

                max_pow++;

                $('#lighter canvas').fire("change", { maxPow: max_pow }); 
            }
        , app.BT_FLAME_CHANGE_TIMEOUT);
    },
    bluetooth_restart_discovery: function() {

        if (app._application_bt_status == app.STATUS_BT_STOPPED) {

            window.clearTimeout(app._discovery_timeout_id);
            return;
        }
        else {

            app._application_bt_status = app.STATUS_BT_DISCOVERING;

            app._discovery_timeout_id = window.setTimeout(

                function() {

                    if (app._application_bt_status == app.STATUS_BT_STOPPED) {
                        window.clearTimeout(app._discovery_timeout_id);
                        return;
                    }

                    bluetoothSerial.setDeviceDiscoveredListener(app.bluetooth_on_device_discovered);
                    bluetoothSerial.discoverUnpaired(app.bluetooth_discovery_finished_success, app.bluetooth_discovery_finished_failure);
                },
                app._discovery_timeout_timeout
            );
        }
    },
    bluetooth_start_discovery: function() {

        app._application_bt_status = app.STATUS_BT_DISCOVERING;

        app._discovery_timeout_id = window.setTimeout(

            function() {

                if (app._application_bt_status == app.STATUS_BT_STOPPED) {
                    window.clearTimeout(app._discovery_timeout_id);
                    return;
                }

                app.bluetooth_flame_light_up();

                app.toast("Aguardando o sinal do charuto... Move o dedo sobre a chama para encerrar a escuta :)", app.TOAST_LONG);
                bluetoothSerial.setDeviceDiscoveredListener(app.bluetooth_on_device_discovered);
                bluetoothSerial.discoverUnpaired(app.bluetooth_discovery_finished_success, app.bluetooth_discovery_finished_failure);
            },
            app._discovery_timeout_timeout
        );
    },
    bluetooth_stop_discovery: function() {

        app._application_bt_status = app.STATUS_BT_STOPPED;

        app.toast("Parando de ouvir o sinal do charuto. Para reiniciar, acenda o isqueiro com o dedo :)", app.TOAST_LONG);

        app.bluetooth_flame_light_down();

        bluetoothSerial.clearDeviceDiscoveredListener();
        window.clearTimeout(app._discovery_timeout_id);
    },
    bluetooth_discovery_finished_success: function(devices) {

        app.bluetooth_restart_discovery();
    },
    bluetooth_discovery_finished_failure: function(error) {

        console.log(error);
        app.bluetooth_restart_discovery();
    },
    bluetooth_is_enabled: function() {

        app.bluetooth_start_discovery();
    },
    bluetooth_on_device_discovered: function(device) {

        if(app._application_bt_status == app.STATUS_BT_DISCOVERING && $.inArray( device.address, app.device_addresses ) > -1) {

            app.check_connection(
                function() {
                    app.toast(
                        "Sinal recebido... estamos preparando um Tweet pra você!",
                        app.TOAST_LONG,
                        function () {
                            $('#lighter canvas').fire("change", app.BT_FLAME_ON_TWEET_PARAMS);
                            app.twitter_send_random_tweet;
                        }
                    );
                }
            );
        }
    },
    bluetooth_enable_success: function() {

        app.toast(
            "Bluetooth habilitado! Vamos lá... :)",
            app.TOAST_LONG,
            app.bluetooth_start_discovery
        );
    },
    bluetooth_enable_failure: function() {

        app.toast("Não foi possível habilitar o seu Bluetooth... por favor tente novamente!");
    },
    bluetooth_is_disabled: function(){

        app.toast(
            "Parece que o seu Bluetooth está desabilitado... vamos resolver isso!",
            app.TOAST_SHORT,
            function () {

                bluetoothSerial.enable(app.bluetooth_enable_success, app.bluetooth_enable_failure);
            }
        );
    },

    hack_override_setDeviceDiscoveredListener: function (notify) {

        if (typeof notify != 'function') {
            throw 'BluetoothSerial.setDeviceDiscoveredListener: Callback not a function';
        }

        cordova.exec(notify, null, "BluetoothSerial", "setDeviceDiscoveredListener", []);
    },

};


