import speechRecognition from '_utils/speechRecognition';
import api from '_utils/api';
import './style.css';

export default function Translator(ops) {
    this.parentNode = document.querySelector(ops.parentNode);
    this.iconNode = this.parentNode.querySelector(ops.iconNode);
    this.btnNode = this.parentNode.querySelector(ops.btnNode);

    this.activeIconClass = ops.activeIconClass;
    this.textClass = ops.textClass;

    this.translates = [];
}

Translator.prototype = Object.assign(Translator.prototype, {
    init: function () {
        if (this.parentNode.dataset.initedTranslator) return;
        this.parentNode.dataset.initedTranslator = true;

        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.showAnswerInModal = this.showAnswerInModal.bind(this);
        this.events();
    },

    events: function () {
        speechRecognition.requestPermission();
        this.btnNode.addEventListener('click', this.start.bind(this));
    },

    start: function () {
        this.btnNode.disabled = true;
        this.iconNode.classList.add(this.activeIconClass);

        speechRecognition.hasPermission()
            .then(speechRecognition.startListening)
            .then(this.stop);
    },

    stop: function (data) {
        this.btnNode.disabled = false;
        this.iconNode.classList.remove(this.activeIconClass);

        this.translates.push(data[0]);
        api({
            method: 'POST',
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?' +
                 'key=trnsl.1.1.20170723T140206Z.abdacee94ec6046d.4da303836a8864d67d556ed472a2a1328ffc486e&' +
                 'lang=ru-en&' +
                 'text=' + encodeURIComponent(data[0]),
        }).then(this.showAnswerInModal);
    },

    showAnswerInModal: function (response) {
        modal.open(this.createAnswerHtml(response.text[0]));
    },

    createAnswerHtml: function (data) {
        var answer = document.createElement('p');
        answer.className = this.textClass;
        answer.innerHTML = data;

        return answer;
    }
});
