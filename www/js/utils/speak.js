/**
 * [speak object has methods for works with TTS plugin]
 */
var speak = {
    start: function (text) {
        return new Promise(function (resolve, reject) {
            TTS.speak(text, resolve, reject);
        });
    },
};

export default speak;
