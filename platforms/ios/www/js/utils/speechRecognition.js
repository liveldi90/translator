var speechRecognition = {
    requestPermission: function () {
        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.requestPermission(resolve, reject);
        });
    },

    hasPermission: function () {
        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.hasPermission(resolve, reject);
        });
    },

    startListening: function (ops) {
        var mergedOps = Object.assign({
            language: 'ru-RU',
            matches: 5,
            showPopup: false,
        }, ops || {});

        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.startListening(resolve, reject, mergedOps);
        });
    },

    stopListening: function () {
        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.stopListening(resolve, reject);
        });
    }
};

export default speechRecognition;
