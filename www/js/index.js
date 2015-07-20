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

    device_address: null,
    twitter_credentials: null,
    twitter_friend: null,
    baby_gender: null,
    tweets: {
        male: [
            "Parabéns [friend_screenname] pelo lindo filhão! Feliz dia dos pais :)",
            "As garotas que se cuidem, o menino do [friend_screenname] acabou de chegar ;) Feliz dia dos pais!"
        ],
        female: [
            "Parabéns [friend_screenname] pela linda princesa!",
            "[friend_screenname] acaba de entrar para o time dos fornecedores! Parabéns e feliz dia dos pais!"
        ]
    },

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
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        //volumehijack.listen(function(evnt){ app.display(evnt);}, function(evnt){ app.display(evnt);});


        //ble.scan([], 50, app.ble_scan_success, function(){console.log('failure scan');});

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
            $("#friend, #friends, #friend-detail").hide();
            $("#gender, #genders").show();
        });

        $("input[name='baby-gender']").change(function(){
            app.baby_gender = $(this).val();
            $("#finish").show();
        });

        $("#finish").click(
            function() {
                $("#gender, #genders").hide();
                $(this).hide();
                app.display("CADASTRO FINALIZADO COM SUCESSO!");
                app.display(app.device_address);
                app.display(app.twitter_friend);
                app.display(app.baby_gender);
            }
        );

        $("#login").click(
            function () {

                $(this).addClass("blink").text("AGUARDE, INICIANDO A CONEXÃO...");

                TwitterClient.login(
                  function(result) {
                    $("#login").hide();
                    $("#friend").show();
                    app.display('Successful login!');
                    app.twitter_credentials = result;

                    $("#picture").css("background-image","url('" + result.profileImageUrl.replace("_normal","") + "')");
                    $("#profile").show();

                    TwitterClient.friends(
                      function(result) {
                        app.display('Successful loaded friends!');

                        $(result).each(
                            function(){
                                $('<a/>', {
                                    id: this.screenName,
                                    text: this.name,
                                    style: "background-image: url('" + this.profileImageUrl.replace("_normal","") + "');"
                                }).appendTo('#friends .carousel');
                            }
                        );



                        $("#friends .carousel").owlCarousel({
                            // Most important owl features
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

                                    $("#friend").removeClass("blink").text("ESCOLHA UM AMIGO");
                                    $("#friends").show();
                                }
                            }
                        );

                      }, function(error) {
                        app.display('Error loading friends');
                        app.display(error);
                      }
                    );

                    $("login").removeClass("blink").text("TWITTER CONNECT");

                  }, function(error) {
                    app.display('Error logging in. Please try again...');
                    $("login").removeClass("blink").text("TWITTER CONNECT");
                  }
                );
            return false;
        });


        $("#scan").click(
            function () {
                $(this).addClass("blink").text("AGUARDE, INICIANDO A CÂMERA...");

                cordova.plugins.barcodeScanner.scan(
                      function (result) {
                          if(result.format == "QR_CODE" && result.text.indexOf("huggies-pais") > -1) {
                            app.device_address = result.text.split("|")[1];
                            app.display("Device reconhecido (" + app.device_address + ")");
                            $("#login").show();
                            $("#scan").hide();
                          } else {
                            app.display("Device não reconhecido! Tente novamente.");
                          }

                          $("#scan").removeClass("blink").text("SCAN QRCODE");
                      },
                      function (error) {
                          app.display("Scanning failed: " + error);
                          $("#scan").removeClass("blink").text("SCAN QRCODE");
                      }
                   );

                   return false;
            }
        );

    },
    display: function(message) {

        console.log(message);

        var display = document.getElementById("message"), // the message div
            lineBreak = document.createElement("br"),     // a line break
            label = document.createTextNode(message);     // create the label

        display.appendChild(lineBreak);          // add a line break
        display.appendChild(label);              // add the message node
    },

    ble_scan_success: function(device) {
        console.log(JSON.stringify(device));
        ble.connect(device.id, app.ble_connect_success, function(){console.log('failure connection')})
    },
    ble_connect_success: function(device) {
        console.log(JSON.stringify(device));
    }
};


