let device,
    previousDevice,
    addClass,
    documentElement,
    find,
    handleOrientation,
    hasClass,
    orientationEvent,
    removeClass,
    userAgent

(function() {
    previousDevice = window.device;

    device = {};

    window.device = device;

    documentElement = window.document.documentElement;

    userAgent = window.navigator.userAgent.toLowerCase();

    device.ios = function () {
        return device.iphone() || device.ipod() || device.ipad();
    };

    device.iphone = function () {
        return !device.windows() && find('iphone');
    };

    device.ipod = function () {
        return find('ipod');
    };

    device.ipad = function () {
        return find('ipad');
    };

    device.android = function () {
        return !device.windows() && find('android');
    };

    device.androidPhone = function () {
        return device.android() && find('mobile');
    };

    device.androidTablet = function () {
        return device.android() && !find('mobile');
    };

    device.blackberry = function () {
        return find('blackberry') || find('bb10') || find('rim');
    };

    device.blackberryPhone = function () {
        return device.blackberry() && !find('tablet');
    };

    device.blackberryTablet = function () {
        return device.blackberry() && find('tablet');
    };

    device.windows = function () {
        return find('windows');
    };

    device.windowsPhone = function () {
        return device.windows() && find('phone');
    };

    device.windowsTablet = function () {
        return device.windows() && (find('touch') && !device.windowsPhone());
    };

    device.fxos = function () {
        return (find('(mobile;') || find('(tablet;')) && find('; rv:');
    };

    device.fxosPhone = function () {
        return device.fxos() && find('mobile');
    };

    device.fxosTablet = function () {
        return device.fxos() && find('tablet');
    };

    device.meego = function () {
        return find('meego');
    };

    device.cordova = function () {
        return window.cordova && location.protocol === 'file:';
    };

    device.nodeWebkit = function () {
        return typeof window.process === 'object';
    };

    device.mobile = function () {
        return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
    };

    device.tablet = function () {
        return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
    };

    device.desktop = function () {
        return !device.tablet() && !device.mobile();
    };

    device.television = function() {
        let i, tvString;

        television = [
            "googletv",
            "viera",
            "smarttv",
            "internet.tv",
            "netcast",
            "nettv",
            "appletv",
            "boxee",
            "kylo",
            "roku",
            "dlnadoc",
            "roku",
            "pov_tv",
            "hbbtv",
            "ce-html"
        ];

        i = 0;
        while (i < television.length) {
            if (find(television[i])) {
                return true;
            }
            i++;
        }
        return false;
    };

    device.portrait = function () {
        return (window.innerHeight / window.innerWidth) > 1;
    };

    device.landscape = function () {
        return (window.innerHeight / window.innerWidth) < 1;
    };

    device.noConflict = function () {
        window.device = previousDevice;
        return this;
    };

    find = function (needle) {
        return userAgent.indexOf(needle) !== -1;
    };

    hasClass = function (className) {
        let regex;
        regex = new RegExp(className, 'i');
        return documentElement.className.match(regex);
    };

    addClass = function (className) {
        let currentClassNames = null;
        if (!hasClass(className)) {
            currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '');
            documentElement.className = currentClassNames + " " + className;
        }
    };

    removeClass = function (className) {
        if (hasClass(className)) {
            documentElement.className = documentElement.className.replace(" " + className, "");
        }
    };

    if (device.ios()) {
        if (device.ipad()) {
            addClass("ios ipad tablet");
        }

        else if (device.iphone()) {
            addClass("ios iphone mobile");
        }

        else if (device.ipod()) {
            addClass("ios ipod mobile");
        }
    }

    else if (device.android()) {
        if (device.androidTablet()) {
            addClass("android tablet");
        }

        else {
            addClass("android mobile");
        }
    }

    else if (device.blackberry()) {
        if (device.blackberryTablet()) {
            addClass("blackberry tablet");
        }

        else {
            addClass("blackberry mobile");
        }
    }

    else if (device.windows()) {
        if (device.windowsTablet()) {
            addClass("windows tablet");
        }

        else if (device.windowsPhone()) {
            addClass("windows mobile");
        }

        else {
            addClass("desktop");
        }
    }

    else if (device.fxos()) {
        if (device.fxosTablet()) {
            addClass("fxos tablet");
        }

        else {
            addClass("fxos mobile");
        }
    }

    else if (device.meego()) {
        addClass("meego mobile");
    }

    else if (device.nodeWebkit()) {
        addClass("node-webkit");
    }

    else if (device.television()) {
        addClass("television");
    }

    else if (device.desktop()) {
        addClass("desktop");
    }

    if (device.cordova()) {
        addClass("cordova");
    }

    handleOrientation = function () {
        if (device.landscape()) {
            removeClass("portrait");
            addClass("landscape");
        }

        else {
            removeClass("landscape");
            addClass("portrait");
        }
        return;
    };

    if (Object.prototype.hasOwnProperty.call(window, "onorientationchange")) {
        orientationEvent = "orientationchange";
    }

    else {
        orientationEvent = "resize";
    }

    if (window.addEventListener) {
        window.addEventListener(orientationEvent, handleOrientation, false);
    }

    else if (window.attachEvent) {
        window.attachEvent(orientationEvent, handleOrientation);
    }

    else {
        window[orientationEvent] = handleOrientation;
    }

    handleOrientation();

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return device;
        });
    }

    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = device;
    }

    else {
        window.device = device;
    }

}).call(this);