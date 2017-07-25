import './style.css';

/**
 * [Modal show any content in Modal. Put in html at once for init and then use the html.]
 */
export default function Modal() {
    var modalNode = document.querySelector('.modal');
    if (modalNode) return;

    this.addModalToHTML();
    this.initVarsModal();
    this.events();
}

Modal.prototype = Object.assign(Modal.prototype, {
    /**
     * [addModalToHTML create html]
     */
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

    /**
     * [initVarsModal]
     */
    initVarsModal: function () {
      this.modalNode = document.querySelector('.modal');
      this.modalContentNode = document.querySelector('.modal--container');
      this.modalCloseNode = document.querySelector('.modal--close');

      this.close = this.close.bind(this);
    },

    /**
     * [events init all need events]
     */
    events: function () {
      this.modalCloseNode.addEventListener('click', this.close);
    },

    /**
     * [open modal]
     * @param  {Element html} html [description]
     */
    open: function (html) {
      this.modalNode.style.display = 'block';
      this.modalContentNode.append(html);
    },

    /**
     * [close modal]
     */
    close: function () {
      this.modalContentNode.innerHTML = '';
      this.modalNode.style.display = 'none';
    },
});
