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
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        console.log('device was ready');
        window.plugins.speechRecognition.requestPermission(successCallback, errorCallback)
        document
            .getElementById('record')
            .addEventListener('click', this.onRecordWav.bind(this));

        window.plugins.speechRecognition.stopListening(successCallback, errorCallback);
    },

    onRecordWav: function () {
        window.plugins.speechRecognition.startListening(
            successCallback, errorCallback, {
                language: 'ru-RU',
                matches: 5,
                showPopup: false,
            })
    },

    onRecord: function () {

        var captureError = function(event) {
            console.log('captureError', event);
        }

        var captureSuccess = function(mediaFiles) {
            console.log('captureSuccess');
            var mediaFile = mediaFiles[0];
            console.log(mediaFile);
            var mf = new Media(mediaFile.localURL);
            console.log(mf)
            mf.play();
            // window.resolveLocalFileSystemURL(mediaFile.localURL, function (fileEntry) {
            //     console.log('success file entry');
            //     readBinaryFile(fileEntry);
            // }, function () {
            //     console.log('error');
            // });
            // var my_media = new Media(mediaFile.localURL)
            // console.log(my_media)
            // console.dir(createFile(dirEntry, fileName, isAppend));

            // var bin = readFile(mediaFile);
            // console.log(bin)
            // var xhr = new XMLHttpRequest();

            // var body = 'uuid=' + encodeURIComponent('96kj98ru895468b58fb536d496dhyr89') +
            //   '&key=' + encodeURIComponent('fc7d4c6f-8282-4a4f-8614-0735571d2b6d');

            // xhr.open("POST", 'https://asr.yandex.net/asr_xml?uuid=01ae13cb744628b58fb536d496daa1e6&key=fc7d4c6f-8282-4a4f-8614-0735571d2b6d&topic=queries', true)
            // xhr.setRequestHeader('Content-Type', 'audio/x-mpeg-3')

            // xhr.onreadystatechange = ...;

            // xhr.send(body);
        }

        // start audio capture
        navigator.device.capture.captureAudio(captureSuccess, captureError, { duration: 2 });

    }

    // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }
};

app.initialize();


function readBinaryFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function(event) {

            console.log("Successful file write: " + event.target.result);
            console.log(event.target.result);
            // var uint8array = new Uint8Array(event.target.result);
            // var str = new TextDecoder().decode(uint8array);

            var xhr = new XMLHttpRequest();

            var body = event.target.result;
            console.log('body');

            xhr.open("POST", 'https://asr.yandex.net/asr_xml?uuid=01ae13cb744628b58fb536d496daa1e6&key=fc7d4c6f-8282-4a4f-8614-0735571d2b6d&topic=queries', true)
            xhr.setRequestHeader('Content-Type', 'audio/mpeg')


            xhr.send(body);
        };

        reader.readAsText(file)

    }, function (e) {
        console.log(e, 'error');
    });
}
function successCallback(e) {
    console.log('success', arguments);
}

function errorCallback(e) {
    console.log('error', arguments);
}

