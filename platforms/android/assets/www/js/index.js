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


        var loginButton = document.getElementById("login");
        loginButton.onclick = function () {

            TwitterConnect.login(
              function(result) {
                app.display('Successful login!');
                app.twitter_credentials = result;
              }, function(error) {
                app.display('Error logging in');
                app.display(error);
              }
            );
            return false;
        }

        var scanButton = document.getElementById("scan");
        scanButton.onclick = function () {
            cordova.plugins.barcodeScanner.scan(
                  function (result) {
                      if(result.format == "QR_CODE" && result.text.indexOf("huggies-pais") > -1) {
                        app.device_address = result.text.split("|")[1];
                        app.display("Device reconhecido (" + app.device_address + ")");
                        loginButton.style.display = "block";
                        scanButton.style.display = "none";
                      } else {
                        app.display("Device não reconhecido! Tente novamente.");
                      }
                  },
                  function (error) {
                      app.display("Scanning failed: " + error);
                  }
               );

               return false;
        }

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


