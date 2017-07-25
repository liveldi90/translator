var speak = {
    start: function (text) {
        return new Promise(function (resolve, reject) {
            TTS.speak(text, resolve, reject);
        });
    },
};

export default speak;
