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

        this.nav = this.element.find('.js-nav');
        this.titles = this.element.find('.js-titles-header');
        this.titleMain = $('.js-titles-main');
        this.buttonMenu = this.element.find('.js-header-menu-button');
        this.navOverride = false;
        this.docWidth = $(document).width();
        this.navSidebar = $('.js-nav-sidebar');

        var $this = this;

        this.findPositions();

        this.buttonMenu.on('click', function(){
            $this.navToggle();
        });

        $(window).scroll(function() {
            $this.checkPosition();
        });
    },

    findPositions : function() {
        this.headerTop = this.headerPlaceholder.position().top;
        this.titleMainBottom = this.titleMain.position().top + this.titleMain.outerHeight(true)

    },

    checkPosition : function () {
        var docWidthCurrent = $(document).width();

        if (this.docWidth != docWidthCurrent) {
            this.findPositions();
        }

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
        var $this = this;

        $this.navSidebar.removeClass('is-hidden');

        setTimeout(function(){
            $('body').toggleClass('is-menu-open');
            this.element.toggleClass('is-titles');
            this.element.toggleClass('is-manual-titles');
            this.navOverride = !this.navOverride;
        }, 100);
    }
};

$('.header').each(function() {
    new travelblog.Header({element:this});
});
