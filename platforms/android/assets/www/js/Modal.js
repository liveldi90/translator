/**
 * Modal
 */

function Modal() {
    var modalNode = document.querySelector('.modal');
    if (modalNode) return;

    this.addModalToHTML();
    this.initVarsModal();
    this.events();
}

Modal.prototype = Object.assign(Modal.prototype, {
    addModalToHTML: function () {
        var modalNode = document.querySelector('.modal');
        if (modalNode) return;

        var modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = (
          '<div class="modal--wrapper">' +
            '<div class="modal--close"></div>' +
            '<div class="modal--container"></div>' +
          '</div>'
        );
        document.body.appendChild(modal);
    },

    initVarsModal: function () {
      this.modalNode = document.querySelector('.modal');
      this.modalContentNode = document.querySelector('.modal--container');
      this.modalCloseNode = document.querySelector('.modal--close');

      this.close = this.close.bind(this);
    },

    events: function () {
      this.modalCloseNode.addEventListener('click', this.close);
    },

    open: function (html) {
      this.modalNode.style.display = 'block';
      this.modalContentNode.append(html);
    },

    close: function () {
      this.modalNode.style.display = 'none';
    },
});

var modal = new Modal();
