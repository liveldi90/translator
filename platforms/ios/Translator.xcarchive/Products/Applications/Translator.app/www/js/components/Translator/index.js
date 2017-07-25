import speechRecognition from '_utils/speechRecognition';
import api from '_utils/api';
import detectionOS from '_utils/detectionOS';
import speak from '_utils/speak';

import './style.css';

var isIOS = detectionOS() === 'iOS';

/**
 * [Translator create a translator, when you can click by a button and give English translate.
 * also you can pronounce english translate.]
 * @param {Object} ops { parentNode, iconNode, btnNode, loaderNode, classes }
 */
export default function Translator(ops) {
    this.parentNode = document.querySelector(ops.parentNode);
    this.iconNode = this.parentNode.querySelector(ops.iconNode);
    this.btnNode = this.parentNode.querySelector(ops.btnNode);
    this.loaderNode = this.parentNode.querySelector(ops.loaderNode)

    this.classes = ops.classes;
}

Translator.prototype = Object.assign(Translator.prototype, {
    /**
     * [init Translator]
     */
    init: function () {
        if (this.parentNode.dataset.initedTranslator) return;
        this.parentNode.dataset.initedTranslator = true;

        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.speak = this.speak.bind(this);
        this.startIOS = this.startIOS.bind(this);
        this.showAnswerInModal = this.showAnswerInModal.bind(this);
        this.showErrorInModal = this.showErrorInModal.bind(this);

        this.isSpeechStarted = false;
        this.events();
    },

    /**
     * [events init all eventh]
     */
    events: function () {
        speechRecognition.requestPermission();

        var start = isIOS ? this.startIOS : this.start;
        this.btnNode.addEventListener('click', start);
    },

    /**
     * [startIOS for ios start have some difference]
     * @return {[type]} [description]
     */
    startIOS: function () {
        if (this.isSpeechStarted) {
            speechRecognition.stopListening();
            this.isSpeechStarted = false;
        } else {
            this.isSpeechStarted = true;
            this.btnNode.innerHTML = 'Остановить';
            this.start();
        }
    },

    /**
     * [start common start]
     */
    start: function () {
        if (!isIOS) this.btnNode.disabled = true;
        this.iconNode.classList.add(this.classes.activeIcon);

        speechRecognition.hasPermission()
            .then(speechRecognition.startListening)
            .then(this.stop)
            .catch(this.showErrorInModal.bind(this, 'Фраза не распознана.'));
    },

    /**
     * [stop stop speaking and catch errors]
     * @param  {Array} data [Array of translated. The first element is more relevant.]
     */
    stop: function (data) {
        this.clearStyles();
        this.loaderNode.style.display = 'block';

        api({
            method: 'POST',
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?' +
                 'key=trnsl.1.1.20170723T140206Z.abdacee94ec6046d.4da303836a8864d67d556ed472a2a1328ffc486e&' +
                 'lang=ru-en&' +
                 'text=' + encodeURIComponent(data[0]),
        })
        .then(this.showAnswerInModal)
        .catch(this.showErrorInModal);
    },

    /**
     * [speak speak text in data]
     * @param  {String} data
     */
    speak: function (data) {
        var btnNode = this.btnSpeakNode;
        btnNode.disabled = true;

        speak.start(data).then(function () {
            btnNode.disabled = false;
        }).catch(function () {
            btnNode.disabled = false;
        });
    },

    /**
     * [showAnswerInModal description]
     * @param  {[type]} response [description]
     * @return {[type]}          [description]
     */
    showAnswerInModal: function (response) {
        this.loaderNode.style.display = 'none';
        var text = response.text[0];

        modal.open(this.createAnswerHtml(text));
    },

    /**
     * [showErrorInModal show catched errors]
     */
    showErrorInModal: function (error) {
        this.clearStyles();
        this.loaderNode.style.display = 'none';
        var message = error instanceof Object && error.message
            ? error.message
            : error;

        modal.open(this.createErrorHtml(message));
    },

    /**
     * [clearStyles remove added styles when start speaking]
     */
    clearStyles: function () {
        if (isIOS) this.btnNode.innerHTML = 'Начать';
        else this.btnNode.disabled = false;

        this.iconNode.classList.remove(this.classes.activeIcon);
    },

    /**
     * [createAnswerHtml]
     * @param  {Object}  data
     * @return {HTML}
     */
    createAnswerHtml: function (data) {
        var classes = this.classes;
        var answer = document.createElement('div');

        // container
        answer.className = classes.answer;
        answer.innerHTML = (
            '<p class="' + classes.text + '">' + data + '</p>' +
            '<div class="' + classes.buttonWrapper + '">' +
                '<button class="' + classes.button + '">Воспроизвести</button>' +
            '</div>'
        );

        this.btnSpeakNode = answer.querySelector('.btn');
        this.btnSpeakNode.addEventListener('click', this.speak.bind(this, data));

        return answer;
    },

    /**
     * [createErrorHtml create modal with error]
     * @param  {String} data [text of error]
     */
    createErrorHtml: function (data) {
        var classes = this.classes;
        var answer = document.createElement('p');

        answer.className = classes.text + ' ' + classes.error;
        answer.innerHTML = data;

        return answer;
    }
});
