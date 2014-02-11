kendo_module({
    id: "mobile.application",
    name: "Application",
    category: "mobile",
    description: "The Mobile application provides a framework to build native looking web applications on mobile devices.",
    depends: [ "mobile.pane", "router" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        support = kendo.support,
        Pane = mobile.ui.Pane,

        DEFAULT_OS = "ios7",
        OS = support.mobileOS,
        BERRYPHONEGAP = OS.device == "blackberry" && OS.flatVersion >= 600 && OS.flatVersion < 1000 && OS.appMode,
        VERTICAL = "km-vertical",
        BROKEN_WEBVIEW_RESIZE = OS.appMode && OS.ios, // && OS.device === "iphone",
        HORIZONTAL = "km-horizontal",

        MOBILE_PLATFORMS = {
            ios7: { ios: true, browser: "default", device: "iphone", flatVersion: "700", majorVersion: "7", minorVersion: "0.0", name: "ios", tablet: false },
            ios: { ios: true, browser: "default", device: "iphone", flatVersion: "612", majorVersion: "6", minorVersion: "1.2", name: "ios", tablet: false },
            android: { android: true, browser: "default", device: "android", flatVersion: "233", majorVersion: "2", minorVersion: "3.3", name: "android", tablet: false },
            blackberry: { blackberry: true, browser: "default", device: "blackberry", flatVersion: "710", majorVersion: "7", minorVersion: "1.0", name: "blackberry", tablet: false },
            meego: { meego: true, browser: "default", device: "meego", flatVersion: "850", majorVersion: "8", minorVersion: "5.0", name: "meego", tablet: false },
            wp: { wp: true, browser: "default", device: "wp", flatVersion: "800", majorVersion: "8", minorVersion: "0.0", name: "wp", tablet: false }
        },

        viewportTemplate = kendo.template('<meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no#=data.height#" name="viewport" />', {usedWithBlock: false}),
        systemMeta = kendo.template('<meta name="apple-mobile-web-app-capable" content="#= data.webAppCapable === false ? \'no\' : \'yes\' #" /> ' +
                     '<meta name="apple-mobile-web-app-status-bar-style" content="#=data.statusBarStyle#" /> ' +
                     '<meta name="msapplication-tap-highlight" content="no" /> ', {usedWithBlock: false}),
        clipTemplate = kendo.template('<style>.km-view { clip: rect(0 #= data.width #px #= data.height #px 0); }</style>', {usedWithBlock: false}),
        ENABLE_CLIP = OS.android && OS.browser != "chrome" || OS.blackberry,
        viewportMeta = viewportTemplate({ height: "" }),

        iconMeta = kendo.template('<link rel="apple-touch-icon' + (OS.android ? '-precomposed' : '') + '" # if(data.size) { # sizes="#=data.size#" #}# href="#=data.icon#" />', {usedWithBlock: false}),

        HIDEBAR = (OS.device == "iphone" || OS.device == "ipod") && OS.majorVersion < 7,
        SUPPORT_SWIPE_TO_GO_BACK = (OS.device == "iphone" || OS.device == "ipod") && OS.majorVersion >= 7,
        HISTORY_TRANSITION = SUPPORT_SWIPE_TO_GO_BACK ? "none" : null,
        BARCOMPENSATION = OS.browser == "mobilesafari" ? 60 : 0,
        STATUS_BAR_HEIGHT = 20,
        WINDOW = $(window),
        HEAD = $("head"),

        // mobile app events
        INIT = "init",
        proxy = $.proxy;

    function osCssClass(os, options) {
        var classes = [];

        if (OS) {
            classes.push("km-on-" + OS.name);
        }

        if (os.skin) {
            classes.push("km-" + os.skin);
        } else {
            if (os.name == "ios" && os.majorVersion > 6) {
                classes.push("km-ios7");
            } else {
                classes.push("km-" + os.name);
            }
        }
        if (os.name == "ios" && os.majorVersion != 7) {
            classes.push("km-" + os.name + os.majorVersion);
        }
        classes.push("km-" + os.majorVersion);
        classes.push("km-m" + (os.minorVersion ? os.minorVersion[0] : 0));

        if (os.appMode) {
            classes.push("km-app");
        } else {
            classes.push("km-web");
        }

        if (options && options.statusBarStyle) {
            classes.push("km-" + options.statusBarStyle + "-status-bar");
        }

        return classes.join(" ");
    }

    function wp8Background() {
        return parseInt($("<div style='background: Background' />").css("background-color").split(",")[1], 10) === 0 ? 'dark' : 'light';
    }

    function isOrientationHorizontal(element) {
        return OS.wp ? element.css("animation-name") == "-kendo-landscape" : (Math.abs(window.orientation) / 90 == 1);
    }

    function getOrientationClass(element) {
        return isOrientationHorizontal(element) ? HORIZONTAL : VERTICAL;
    }

    function setMinimumHeight(pane) {
        pane.parent().addBack()
               .css("min-height", window.innerHeight);
    }

    function applyViewportHeight() {
        $("meta[name=viewport]").remove();
        HEAD.append(viewportTemplate({
            height: ", width=device-width" +  // width=device-width was removed for iOS6, but this should stay for BB PhoneGap.
                        (isOrientationHorizontal() ?
                            ", height=" + window.innerHeight + "px"  :
                            (support.mobileOS.flatVersion >= 600 && support.mobileOS.flatVersion < 700) ?
                                ", height=" + window.innerWidth + "px" :
                                ", height=device-height")
        }));
    }

    var Application = kendo.Observable.extend({
        init: function(element, options) {
            var that = this;

            mobile.application = that; // global reference to current application

            that.options = $.extend({
                hideAddressBar: true,
                useNativeScrolling: false,
                statusBarStyle: "black",
                transition: "",
                historyTransition: HISTORY_TRANSITION,
                updateDocumentTitle: true
            }, options);

            kendo.Observable.fn.init.call(that, that.options);
            that.bind(that.events, that.options);

            $(function(){
                element = $(element);
                that.element = element[0] ? element : $(document.body);
                that._setupPlatform();
                that._attachMeta();
                that._setupElementClass();
                that._attachHideBarHandlers();
                that.pane = new Pane(that.element, that.options);
                that.pane.navigateToInitial();

                if (that.options.updateDocumentTitle) {
                    that._setupDocumentTitle();
                }

                that._startHistory();
                that.trigger(INIT);
            });
        },

        events: [
            INIT
        ],

        navigate: function(url, transition) {
            this.pane.navigate(url, transition);
        },

        scroller: function() {
            return this.view().scroller;
        },

        hideLoading: function() {
            if (this.pane) {
                this.pane.hideLoading();
            } else {
                throw new Error("The mobile application instance is not fully instantiated. Please consider activating loading in the application init event handler.");
            }
        },

        showLoading: function() {
            if (this.pane) {
                this.pane.showLoading();
            } else {
                throw new Error("The mobile application instance is not fully instantiated. Please consider activating loading in the application init event handler.");
            }
        },

        changeLoadingMessage: function(message) {
            if (this.pane) {
                this.pane.changeLoadingMessage(message);
            } else {
                throw new Error("The mobile application instance is not fully instantiated. Please consider changing the message in the application init event handler.");
            }
        },

        view: function() {
            return this.pane.view();
        },

        skin: function(skin) {
            var that = this;

            if (!arguments.length) {
                return that.options.skin;
            }

            that.options.skin = skin || "";
            that.element[0].className = "km-pane";
            that._setupPlatform();
            that._setupElementClass();

            return that.options.skin;
        },

        destroy: function() {
            this.pane.destroy();
            this.router.destroy();
        },

        _setupPlatform: function() {
            var that = this,
                platform = that.options.platform,
                skin = that.options.skin,
                os = OS || MOBILE_PLATFORMS[DEFAULT_OS];

            if (platform) {
                if (typeof platform === "string") {
                    os = $.extend({}, os, MOBILE_PLATFORMS[platform]);
                } else {
                    os = platform;
                }
            }
            if (skin) {
                os = $.extend({}, os, {skin: skin});
            }

            that.os = os;

            that.osCssClass = osCssClass(that.os, that.options);

            if (!os.skin && os.name == "wp") {
                that.element.parent().css("overflow", "hidden");

                var refreshBackgroundColor = function() {
                    that.element.removeClass("km-wp-dark km-wp-light").addClass("km-wp-" + wp8Background());
                };

                $(window).on("focusin", refreshBackgroundColor); // Restore theme on browser focus (requires click).
                document.addEventListener("resume", refreshBackgroundColor); // PhoneGap fires resume.

                refreshBackgroundColor();
            }
        },

        _startHistory: function() {
            this.router = new kendo.Router({ pushState: this.options.pushState, root: this.options.root });
            this.pane.bindToRouter(this.router);
            this.router.start();
        },

        _resizeToScreenHeight: function() {
            var statusBarOverlaps = $("meta[name=apple-mobile-web-app-status-bar-style]").attr("content") === "black-translucent";

            if (isOrientationHorizontal(this.element)) {
                this.element.height(window.screen.availWidth - (statusBarOverlaps ? 0 : STATUS_BAR_HEIGHT));
            } else {
                this.element.height(window.screen.availHeight + (statusBarOverlaps ? STATUS_BAR_HEIGHT : 0));
            }
        },

        _setupElementClass: function() {
            var that = this, size,
                element = that.element;

            element.parent().addClass("km-root km-" + (that.os.tablet ? "tablet" : "phone"));
            element.addClass(that.osCssClass + " " + getOrientationClass(element));
            if (this.options.useNativeScrolling) {
                element.parent().addClass("km-native-scrolling");
            }

            if (support.wpDevicePixelRatio) {
                element.parent().css("font-size", support.wpDevicePixelRatio + "em");
            }

            if (BERRYPHONEGAP) {
                applyViewportHeight();
            }
            if (that.options.useNativeScrolling) {
                element.parent().addClass("km-native-scrolling");
            } else if (ENABLE_CLIP) {
                size = (screen.availWidth > screen.availHeight ? screen.availWidth : screen.availHeight) + 200;
                $(clipTemplate({ width: size, height: size })).appendTo(HEAD);
            }

            if (BROKEN_WEBVIEW_RESIZE) {
                that._resizeToScreenHeight();
            }

            kendo.onResize(function() {
                element
                    .removeClass("km-horizontal km-vertical")
                    .addClass(getOrientationClass(element));

                if (that.options.useNativeScrolling) {
                    setMinimumHeight(element);
                }

                if (BROKEN_WEBVIEW_RESIZE) {
                    that._resizeToScreenHeight();
                }

                if (BERRYPHONEGAP) {
                    applyViewportHeight();
                }

                kendo.resize(element);
            });
        },

        _attachMeta: function() {
            var options = this.options,
                icon = options.icon, size;

            if (!BERRYPHONEGAP) {
                HEAD.prepend(viewportMeta);
            }

            HEAD.prepend(systemMeta(options));

            if (icon) {
                if (typeof icon === "string") {
                    icon = { "" : icon };
                }

                for(size in icon) {
                    HEAD.prepend(iconMeta({ icon: icon[size], size: size }));
                }
            }

            if (options.useNativeScrolling) {
                setMinimumHeight(this.element);
            }
        },

        _attachHideBarHandlers: function() {
            var that = this,
                hideBar = proxy(that, "_hideBar");

            if (support.mobileOS.appMode || !that.options.hideAddressBar || !HIDEBAR || that.options.useNativeScrolling) {
                return;
            }

            that._initialHeight = {};

            WINDOW.on("load", hideBar);

            kendo.onResize(function () {
                setTimeout(window.scrollTo, 0, 0, 1);
            });
        },

        _setupDocumentTitle: function() {
            var that = this,
                defaultTitle = document.title;

            that.pane.bind("viewShow", function(e) {
                var title = e.view.title;
                document.title = title !== undefined ? title : defaultTitle;
            });
        },

        _hideBar: function() {
            var that = this,
                element = that.element;

            element.height(kendo.support.transforms.css + "calc(100% + " + BARCOMPENSATION + "px)");
            $(window).trigger(kendo.support.resize);
        }
    });

    kendo.mobile.Application = Application;
})(window.kendo.jQuery);
