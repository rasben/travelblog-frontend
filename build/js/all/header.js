travelblog.Header=function(a){this.element=$(a.element),this._attach()},travelblog.Header.prototype={_attach:function(){this.headerPlaceholder=this.element.find(".js-header-placeholder"),this.headerTop=this.headerPlaceholder.position().top,this.nav=this.element.find(".js-nav"),this.titles=this.element.find(".js-titles-header"),this.titleMain=$(".js-titles-main"),this.titleMainBottom=this.titleMain.position().top+this.titleMain.outerHeight(!0),this.buttonMenu=this.element.find(".js-header-menu-button"),this.navOverride=!1;var a=this;this.buttonMenu.on("click",function(){a.navToggle()}),$(window).scroll(function(){a.checkPosition()})},checkPosition:function(){var a=$(document).scrollTop();a>this.titleMainBottom?this.showTitles():this.hideTitles(),a>this.headerTop?this.stickHeader():this.unstickHeader()},showTitles:function(){this.element.addClass("is-titles")},hideTitles:function(){this.element.removeClass("is-titles")},stickHeader:function(){this.element.addClass("is-fixed")},unstickHeader:function(){this.element.removeClass("is-fixed")},navToggle:function(){$("body").toggleClass("is-menu-open"),this.element.toggleClass("is-titles"),this.element.toggleClass("is-manual-titles"),this.navOverride=!this.navOverride}},$(".header").each(function(){new travelblog.Header({element:this})});