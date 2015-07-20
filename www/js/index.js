<!DOCTYPE html>
<!--
    Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->
<html>
    <head>
        <meta charset="utf-8" />
        <!-- Enable all requests, inline styles, and eval() -->
        <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'">

        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <!-- WARNING: for iOS 7, remove the width=device-width and height=device-height attributes. See https://issues.apache.org/jira/browse/CB-4323 -->
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
        <link rel="stylesheet" type="text/css" href="css/index.css" />
        <link rel="stylesheet" type="text/css" href="js/owl-carousel/owl.carousel.css">
        <link rel="stylesheet" type="text/css" href="js/owl-carousel/owl.theme.css">
        <title>Hello World</title>
    </head>
    <body>
        <div class="app">
            <h1>HUGGIES</h1>
            <div id="deviceready">
                <p class="event listening">Connecting to Device</p>
                <p class="event received">PROTÓTIPO - DIA DOS PAIS</p>
            </div>
            <div id="profile" style="display: none">
                <div id="picture"></div>
                <div id="actions" style="display: none">
                    <a href="#">desconectar</a>
                </div>
            </div>
        </div>
        <div id="message" style="display: none">CLIQUE NO BOTÃO ABAIXO PARA IDENTIFICAR O DEVICE</div>
        <a href="#" id="scan-qrcode" style="display: none" class="step">SCAN QRCODE</a>
        <a href="#" id="twitter-connect" style="display: none" class="step">TWITTER CONNECT</a>
        <span id="friend-pick" style="display: none" class="step blink">AGUARDE, CARREGANDO AMIGOS...</span>
        <div id="friend-list-container" style="display: none">
            <div class="carousel"></div>
        </div>
        <div id="friend-detail" style="display: none">
            <span id="friend-picture"></span>
            <span id="friend-name"></span>
            <span id="friend-screenname"></span>
            <ul>
                <li><a href="#" id="cancel">Cancelar</a></li>
                <li><a href="#" id="confirm">Confirmar</a></li>
            </ul>
        </div>
        <span id="gender-pick" style="display: none" class="step">É MENINO OU MENINA?</span>
        <ul id="gender-list" style="display: none">
            <li>
                <input name="baby-gender" type="radio" id="male" value="male">
                <label for="male">Menino</label>
            </li>
            <li>
                <input name="baby-gender" type="radio" id="female" value="female">
                <label for="female">Menina</label>
            </li>
        </ul>
        <a href="#" id="finish-setup" style="display: none" class="step">FINALIZAR</a>
        <a href="#" id="start-discovery" style="display: none" class="step">START DEVICE DISCOVERY</a>
        <a href="#" id="finish-discovery" style="display: none" class="step">FINISH DEVICE DISCOVERY</a>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
        <script type="text/javascript" src="js/owl-carousel/owl.carousel.min.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
        <script type="text/javascript">
            app.initialize();
        </script>
    </body>
</html>
