import '_styles/reset.css';
import '_styles/main.css';

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
            loaderNode: '.translator--loader',

            activeIconClass: 'translator--icon-active',
            textClass: 'translator--text',
            errorClass: 'translator--error'
        });
        translator.init();
    },
};

app.initialize();
