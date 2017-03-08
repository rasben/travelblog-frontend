/**
 * Controller for light-box (image magnifier)
 */
travelblog.LightBox = function(options) {
    this.element = $(options.element);
    this._attach();
};


travelblog.LightBox.prototype = {
    _attach: function () {

    }
}

$('.js-lightbox').each(function() {
    new travelblog.LightBox({element:this});
});
