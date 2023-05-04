let btn_up = document.querySelector('.btn_up')
let delete_account = document.querySelector('.delete_account')
let min_size_window = document.querySelectorAll('.min_size_window')
let header = document.querySelectorAll('.header')
let body_class = document.querySelectorAll('.body')
let flex_content = document.querySelectorAll('.flex-content')

fetch('/image_profile',{
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => (data.forEach((item) => {
        console.log(item.image)
        let image_profile = document.querySelectorAll('.image_profile')
        for (let image_profile_1 of image_profile) {
            image_profile_1.style.background=`url(${item.image})` + 'no-repeat'
            image_profile_1.style.backgroundSize=`100%`
            image_profile_1.style.width=`34%`
            image_profile_1.style.borderRadius=`50px`
        }
    })));


btn_up.addEventListener('click', () => {
    btn_up.classList.toggle('round')
    delete_account.classList.toggle('block')
})

let signboard = document.querySelector('.signboard')
let hello = document.querySelector('.hello')
let btn_start_message = document.querySelector('.btn_start_message')
let flex = document.querySelector('.flex')
let CommandDev = document.querySelector('.CommandDev')

for (let MinSizeWindowItter of min_size_window) {
    MinSizeWindowItter.addEventListener('click', () => {
        for (let head of header) {
            signboard.classList.remove('none')
            hello.classList.remove('none')
            btn_start_message.classList.remove('none')
            MinSizeWindowItter.classList.toggle('none')
            hello.classList.remove('HelloHeaderOpen')
            btn_start_message.classList.remove('BtnStartMessageBurgerOpened')
            head.classList.toggle('visible')
            // CommandDev.classList.remove('NoneCommandDev')
            for (let body of body_class) {
                body.classList.remove('max_size_window')
            }
            for (let menu of burger_menu) {
                menu.classList.remove('none')
            }
            for (let contents of document.querySelectorAll('.content')) {
                contents.classList.remove('none_content')
            }
            for (let flex_content_itter of flex_content) {
                flex_content_itter.classList.toggle('flex-content-new')
                flex_content_itter.classList.remove('flex-content-new-burger-open')
            }
            let chat = document.querySelectorAll('.chat')
            for (let chat_all of chat) {
                chat_all.classList.remove('chat_burger_open')
            }
        }
    })
}

let burger_menu = document.querySelectorAll('.burger_menu')

for (let menu of burger_menu) {
    menu.addEventListener('click', () => {
        for (let head of header) {
            signboard.classList.add('none')
            head.classList.toggle('visible')
            menu.classList.toggle('none')
            hello.classList.add('none')
            btn_start_message.classList.add('none')
            hello.classList.add('HelloHeaderOpen')
            btn_start_message.classList.add('BtnStartMessageBurgerOpened')
            // CommandDev.classList.add('NoneCommandDev')
            for (let min_size_windows of min_size_window) {
                min_size_windows.classList.remove('none')
            }
            for (let body of body_class) {
                body.classList.toggle('max_size_window')
            }
            for (let contents of document.querySelectorAll('.content')) {
                contents.classList.toggle('none_content')
            }
            for (let flex_content_itter of flex_content) {
                flex_content_itter.classList.toggle('flex-content-new')
                flex_content_itter.classList.toggle('flex-content-new-burger-open')
            }
            let chat = document.querySelectorAll('.chat')
            for (let chat_all of chat) {
                chat_all.classList.toggle('chat_burger_open')
            }
        }
    })
}

// CommandDev.addEventListener('click', () => {
//     window.open('/CommandDev', '_self')
// })

let username1 = document.querySelectorAll('.username')
for (let UserNameItter of username1) {
    UserNameItter.addEventListener('click', (event) => {
        console.log(event.currentTarget.textContent)
        window.open(`/AccountPage/${event.currentTarget.textContent}`, '_self')
    })
}

let username2 = document.querySelectorAll('.UserName')
for (let UserNameItter of username2) {
    UserNameItter.addEventListener('click', (event) => {
        console.log(event.currentTarget.textContent)
        window.open(`/AccountPage/${event.currentTarget.textContent}`, '_self')
    })
}