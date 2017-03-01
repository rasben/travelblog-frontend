/**
 * Controller for header
 */
travelblog.Header = function(options) {
    this.element = $(options.element);
    this._attach();
};

travelblog.Header.prototype = {
    _attach : function () {
        this.headerPlaceholder = this.element.find('.js-header-placeholder');
        this.headerTop = this.headerPlaceholder.position().top;
        this.nav = this.element.find('.js-nav');
        this.titles = this.element.find('.js-titles-header');
        this.titleMain = $('.js-titles-main');
        this.titleMainBottom = this.titleMain.position().top + this.titleMain.outerHeight(true)



        var $this = this;

        // Scroll event, with timeout that wont trigger until user has stopped scrolling.
        $(window).scroll(function() {
            /*
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                $this.checkPosition();

            }, 100));

            */
            $this.checkPosition();

        });
    },

    checkPosition : function () {

        var position = $(document).scrollTop();

        if (position > this.titleMainBottom) {
            this.hideNav();
        }

        else {
            this.showNav();
        }

        if (position > this.headerTop) {
            this.stickHeader();
        }

        else {
            this.unstickHeader();
        }
    },

    hideNav : function() {
        this.element.addClass('is-titles');
    },

    showNav : function() {
        this.element.removeClass('is-titles');
    },

    stickHeader : function() {
        this.element.addClass('is-fixed');
    },

    unstickHeader : function() {
        this.element.removeClass('is-fixed');
    }
};

$('.header').each(function() {
    new travelblog.Header({element:this});
});
