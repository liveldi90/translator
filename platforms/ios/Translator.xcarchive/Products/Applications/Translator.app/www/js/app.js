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

            classes: {
                activeIcon: 'translator--icon-active',
                text: 'answer--text',
                error: 'answer--error',
                buttonWrapper: 'answer--btn',
                button: 'btn',
                answer: 'answer',
            },
        });
        translator.init();
    },
};

app.initialize();
