function IsDesktop() {
    console.log('ПК');
}

function IsTablet() {
    console.log('Планшет');
}

function IsMobile() {
    console.log('Смартфон');
}

function WhichScreeSize() {
    if (device.landscape()) {
        console.log('Альбомная (в ширину)');
    }

    else if (device.portrait()) {
        console.log('Портретная (в высоту)');
    }
}

function IsIos () {
    console.log('iOS');
}

function IsIpad () {
    console.log('ipad');
}

function IsIphone () {
    console.log('iphone');
}

function IsIpod () {
    console.log('ipod')
}

function IsAndroid () {
    console.log('android');
}

function IsWindows () {
    console.log('windows');
}