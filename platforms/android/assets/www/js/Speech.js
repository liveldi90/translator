/**
 * Speech constructor
 */

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

function Speech(ops) {
    this.parentNode = document.querySelector(ops.parentNode);
    this.iconNode = this.parentNode.querySelector(ops.iconNode);
    this.btnNode = this.parentNode.querySelector(ops.btnNode);
    this.activeIconClass = ops.activeIconClass;

    this.translates = [];
}

Speech.prototype = Object.assign(Speech.prototype, {
    init: function () {
        if (this.parentNode.dataset.initedSpeech) return;
        this.parentNode.dataset.initedSpeech = true;

        this.stopSpeech = this.stopSpeech.bind(this);
        this.startSpeech = this.startSpeech.bind(this);
        this.events();
    },

    events: function () {
        speechRecognition.requestPermission();
        this.btnNode.addEventListener('click', this.startSpeech.bind(this));
    },

    startSpeech: function () {
        this.btnNode.disabled = true;
        this.iconNode.classList.add(this.activeIconClass);

        speechRecognition.hasPermission()
            .then(speechRecognition.startListening)
            .then(this.stopSpeech);
    },

    stopSpeech: function (data) {
        this.btnNode.disabled = false;
        this.iconNode.classList.remove(this.activeIconClass);

        this.translates.push(data[0]);
        modal.open(this.createAnswerHtml(data[0]));
    },

    createAnswerHtml: function (data) {
        var answer = document.createElement('p');
        answer.className = 'speech--text';
        answer.innerHTML = data;

        return answer;
    }
});
