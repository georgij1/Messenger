let contacts = document.querySelector('.contacts')
let btn_nav_chat = document.querySelectorAll('.btn_nav_contact')
let all_chat = document.querySelector('.btn_all_contacts')
let content_all_chat = document.querySelector('.all_contacts')
let content_all_my_chat = document.querySelector('.all_my_contacts')
let all_my_chat = document.querySelector('.btn_all_my_contacts')
let close_window_1 = document.querySelector('.close_window_1')
let body = document.querySelector('.body')
let chat_user_user = document.querySelector('.chat_user_user')
let header_contacts = document.querySelector('.header')


for (let btn_nav_chat_itter of btn_nav_chat) {
    btn_nav_chat_itter.addEventListener('click', () => {
        btn_nav_chat_itter.classList.add('btn_nav_chat_checked')
    })
}

all_chat.addEventListener('click', () => {
    content_all_chat.classList.add('visible')
    content_all_my_chat.classList.remove('visible')
})

all_my_chat.addEventListener('click', () => {
    content_all_my_chat.classList.add('visible')
    content_all_chat.classList.remove('visible')
})

let FormData1 = {
    "UsernameYour": document.querySelector('.username').textContent
}

fetch('/AllUsersContacts', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors",
    method: 'POST',
    body: JSON.stringify(FormData1)
})
    .then(response => response.json())
    .then(data_arr => data_arr.forEach((item) => {
        let list_chats = document.querySelector('.list_chats')
        list_chats.innerHTML += `
            <div class="contact">
                <div class="ImageUsername">
                    <div class="image_user"></div>
                    <div class="username_user">${item.username}</div>                        
                </div>
               
                <div class="btn_send_message">Добавить в контакты</div>
            </div>
        `

        for (let image_user_itter of document.querySelectorAll('.image_user')) {
            image_user_itter.style.background = `url(${item.image})` + 'center no-repeat'
            image_user_itter.style.backgroundSize = `80%`
            image_user_itter.style.width = `35%`
            image_user_itter.style.borderRadius = `50px`
            image_user_itter.style.height = '60px'
            image_user_itter.style.boxShadow = '0 0 10px bisque'
        }

        for (let BtnSendMessageItter of document.querySelectorAll('.btn_send_message')) {
            BtnSendMessageItter.addEventListener('click', () => {
                console.log(item.username)
                const formData_new = {
                    "username": item.username,
                    "image": item.image
                }

                console.log('add_new user to contacts')
                console.log(formData_new.username)
                console.log(formData_new.image)

                fetch('/ContactUsername', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData_new)
                    })
                        .then(res => {
                            console.log(res)
                        })
                        .then(() => {
                            console.log(formData_new)
                        })
                })
        }
    }))

fetch('/AllMyChats', {
    headers: {
        "Content-Type": "application/json"
    },
    mode: "cors",
    method: 'POST',
    body: JSON.stringify(FormData1),
})
    .then(res => res.json())
    .then(data => data.forEach(item => {
        let list_my_contacts = document.querySelector('.list_my_contacts')
        console.log(item.id)
        if (item.length === 0) {
            list_my_contacts.innerText='Контактов нет'
        }

        else {
            console.log('else')
            list_my_contacts.innerHTML = `
            <div class="contacts">
                <div class="contact">
                    <div class="ImageUsername">
                        <div class="image_user_1"></div>
                        <div class="username_user">${item.username}</div>
                    </div>
                    
                    <div class="ChatId">${item.id}</div>

                    <div class="btn_send_message btn_start_chatting">Начать общаться</div>
                </div>
            </div>
        `
            let image_user_1 = document.querySelector('.image_user_1')
            image_user_1.style.background = `url(${item.image})` + 'center no-repeat'
            image_user_1.style.backgroundSize = `80%`
            image_user_1.style.width = `35%`
            image_user_1.style.borderRadius = `50px`
            image_user_1.style.height = '60px'
            image_user_1.style.boxShadow = '0 0 10px bisque'

            let BtnStartChatting = document.querySelectorAll('.btn_start_chatting')

            for (let BtnStartChattingItter of BtnStartChatting) {
                BtnStartChattingItter.addEventListener('click', (event) => {
                    const formData = {
                        "username": item.username,
                        "ImageChat": document.querySelector('.ImageProfilePBlock').textContent
                    }

                    fetch('/contacts/start/message/username', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    })
                        .then(res => {
                            console.log(res)
                        })
                        .then(() => {
                            console.log('formData')
                            console.log(formData)
                        })
                        .then(() => {
                            console.log(item.id)
                        })
                    .then(() => window.open(`/chat/${item.id}`, '_self'))
                })
            }
        }

        close_window_1.addEventListener('click', () => {
            close_window_1.classList.remove('visible')
            body.classList.remove('none')
            chat_user_user.classList.remove('visible')
            header_contacts.classList.remove('none')
        })
    }))

let username1 = document.querySelectorAll('.username')
for (let UserNameItter of username1) {
    UserNameItter.addEventListener('click', (event) => {
        console.log(event.currentTarget.textContent)
        window.open(`/AccountPage/${event.currentTarget.textContent}`, '_self')
    })
}