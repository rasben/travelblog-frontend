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
        this.buttonMenu = this.element.find('.js-header-menu-button');
        this.navOverride = false;



        var $this = this;

        this.buttonMenu.on('click', function(){
            $this.navToggle();
        });

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
            this.showTitles();
        }

        else {
            this.hideTitles();
        }

        if (position > this.headerTop) {
            this.stickHeader();
        }

        else {
            this.unstickHeader();
        }
    },

    showTitles : function() {
        this.element.addClass('is-titles');
    },

    hideTitles : function() {
        this.element.removeClass('is-titles');
    },

    stickHeader : function() {
        this.element.addClass('is-fixed');
    },

    unstickHeader : function() {
        this.element.removeClass('is-fixed');
    },

    navToggle : function() {
        $('body').toggleClass('is-menu-open');
        this.element.toggleClass('is-titles');
        this.element.toggleClass('is-manual-titles');
        this.navOverride = !this.navOverride;
    }
};

$('.header').each(function() {
    new travelblog.Header({element:this});
});
