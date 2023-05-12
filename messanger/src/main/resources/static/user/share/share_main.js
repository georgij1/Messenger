document.querySelector('.close_window').addEventListener('click', () => {
    window.history.back()
})

// Ya.share2('my-share', {
//     content: {
//         url: 'https://yandex.com',
//         title: 'Yandex',
//         description: 'All about Yandex',
//         image: 'https://yastatic.net/morda-logo/i/logo.svg'
//     }
// });

let myShare = document.getElementById('my-share');
let PathImage = document.querySelector('.PathImage').textContent
console.log(PathImage)

// let share = Ya.share2(myShare, {
//     content: {
//         // url: 'https://yandex.com',
//         // title: 'Мессенджер',
//         // description: 'Мессенджер',
//         image: PathImage
//     },
//
//     theme: {
//         services: 'vkontakte,telegram,whatsapp',
//         lang: 'ru',
//         limit: 3,
//         size: 's',
//         bare: false,
//         curtain: true,
//         copy: 'last',
//     },
//
//     contentByService: {
//         telegram: {
//             image: 'http://localhost:8080' + PathImage
//         }
//     },
//
//     hooks: {
//         onready: function () {
//             console.log('блок инициализирован');
//         },
//
//         onshare: function (name) {
//             console.log('нажата кнопка' + name);
//         }
//     }
// });