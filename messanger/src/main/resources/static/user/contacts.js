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

fetch('/all_users', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then(data_arr => data_arr.forEach((item) => {
        let list_chats = document.querySelector('.list_chats')
        list_chats.innerHTML += `
            <div class="contact">
                <div class="image_user"></div>
            
                <div class="tools_user">                        
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


        document.querySelector('.btn_send_message').addEventListener('click', () => {
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
    }))

fetch('/AllMyChats', {
    headers: {
        "Content-Type": "application/json"
    },
    mode: "cors"
})
    .then(res => res.json())
    .then(data => data.forEach(item => {
        let list_my_contacts = document.querySelector('.list_my_contacts')
        if (item.length === 0) {
            console.log('list of contacts is null')
            list_my_contacts.innerText='Контактов нет'
        }

        else {
            console.log('else')
            list_my_contacts.innerHTML = `
            <div class="contacts">
                <div class="contact">
                    <div class="image_user_1"></div>
                    <div class="username_user">${item.username}</div>
                    <div class="btn_send_message">Начать общаться</div>
                </div>
            </div>
        `
            let image_user_1 = document.querySelector('.image_user_1')
            image_user_1.style.background = `url(${item.image})` + 'center no-repeat'
            image_user_1.style.backgroundSize = `80%`
            image_user_1.style.width = `39%`
            image_user_1.style.borderRadius = `50px`
            image_user_1.style.height = '60px'
            image_user_1.style.boxShadow = '0 0 10px bisque'


            document.querySelector('.btn_send_message').addEventListener('click', () => {
                const formData = {
                    "username": item.username
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

                body.classList.add('none')

                close_window_1.classList.add('visible')
                chat_user_user.classList.add('visible')
                header_contacts.classList.add('none')
            })
        }

        close_window_1.addEventListener('click', () => {
            close_window_1.classList.remove('visible')
            body.classList.remove('none')
            chat_user_user.classList.remove('visible')
            header_contacts.classList.remove('none')
        })
    }))