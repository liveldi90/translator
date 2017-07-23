var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        var speech = new window.Speech({
            parentNode: '.speech',
            iconNode: '.speech--icon',
            btnNode: '.speech--btn',
            activeIconClass: 'speech--icon-active',
        });
        speech.init();
    },
};

app.initialize();
