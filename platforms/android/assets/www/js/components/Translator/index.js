import speechRecognition from '_utils/speechRecognition';
import api from '_utils/api';
import './style.css';

export default function Translator(ops) {
    this.parentNode = document.querySelector(ops.parentNode);
    this.iconNode = this.parentNode.querySelector(ops.iconNode);
    this.btnNode = this.parentNode.querySelector(ops.btnNode);
    this.loaderNode = document.querySelector(ops.loaderNode)

    this.activeIconClass = ops.activeIconClass;
    this.textClass = ops.textClass;
    this.errorClass = ops.errorClass;
}

Translator.prototype = Object.assign(Translator.prototype, {
    init: function () {
        if (this.parentNode.dataset.initedTranslator) return;
        this.parentNode.dataset.initedTranslator = true;

        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.showAnswerInModal = this.showAnswerInModal.bind(this);
        this.showErrorInModal = this.showErrorInModal.bind(this);

        this.events();
    },

    events: function () {
        speechRecognition.requestPermission();
        this.btnNode.addEventListener('click', this.start);
    },

    start: function () {
        this.btnNode.disabled = true;
        this.iconNode.classList.add(this.activeIconClass);

        speechRecognition.hasPermission()
            .then(speechRecognition.startListening)
            .then(this.stop);
    },

    stop: function (data) {
        this.btnNode.innerText = 'Начать';
        this.isActive = false;
        this.iconNode.classList.remove(this.activeIconClass);

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

    showAnswerInModal: function (response) {
        this.loaderNode.style.display = 'none';
        modal.open(this.createAnswerHtml(response.text[0]));
    },

    showErrorInModal: function (error) {
        this.loaderNode.style.display = 'none';
        var message = 'Ошибка при получении перевода. ' + error.message;

        modal.open(this.createAnswerHtml(message, true));
    },

    createAnswerHtml: function (data, isError) {
        var answer = document.createElement('p');
        answer.className = isError
            ? this.textClass + ' ' + this.errorClass
            : this.textClass;
        answer.innerHTML = data;

        return answer;
    }
});
