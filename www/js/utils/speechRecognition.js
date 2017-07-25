var speechRecognition = {
    /**
     * [requestPermission wrapper by requestPermission]
     * @return {Promise}
     */
    requestPermission: function () {
        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.requestPermission(resolve, reject);
        });
    },

    /**
     * [hasPermission wrapper by hasPermission]
     * @return {Promise}
     */
    hasPermission: function () {
        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.hasPermission(resolve, reject);
        });
    },

    /**
     * [startListening wrapper by startListening]
     * @return {Promise}
     */
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

    /**
     * [stopListening wrapper by stopListening]
     * @return {Promise}
     */
    stopListening: function () {
        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.stopListening(resolve, reject);
        });
    }
};

export default speechRecognition;
