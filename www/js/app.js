import Translator from '_components/Translator';
import Modal from '_components/Modal';

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        window.modal = new Modal();

        var translator = new Translator({
            parentNode: '.translator',
            iconNode: '.translator--icon',
            btnNode: '.translator--btn',

            activeIconClass: 'translator--icon-active',
            textClass: 'translator--text',
        });
        translator.init();
    },
};

app.initialize();
