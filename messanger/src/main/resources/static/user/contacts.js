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


fetch('/count/username', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then(data => data.forEach((item) => {
        console.log(item)
        for (let i = 0; i < item.count; i++) {
            let create_div = document.createElement('div')
            create_div.className = 'contact'
            contacts.appendChild(create_div)
            fetch('/all_users', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors"
            })
                .then(response => response.json())
                .then(data_arr => data_arr.forEach((item) => {
                    console.log(item)
                    create_div.innerHTML = `
                        <!--<div class="id_user">${item.id}</div>-->
                        <div class="image_user"></div>
                        
                        <div class="tools_user">
                            <div class="username_user">${item.username}</div>                        
                        </div>
                        
                        <div class="btn_send_message">Добавить в контакты</div>
                    `
                    let image_user = document.querySelectorAll('.image_user')
                    for (let image_user_itter of image_user) {
                        image_user_itter.style.background = `url(${item.image})` + 'center no-repeat'
                        image_user_itter.style.backgroundSize = `80%`
                        image_user_itter.style.width = `35%`
                        image_user_itter.style.borderRadius = `50px`
                        image_user_itter.style.height = '60px'
                        image_user_itter.style.boxShadow = '0 0 10px bisque'
                    }

                    let btn_send_message = document.querySelector('.btn_send_message')
                    btn_send_message.addEventListener('click', () => {
                        console.log(item.username)
                        const formData = {
                            "username": item.username,
                            "image": item.image
                        }

                        fetch('/ContactUsername', {
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
                                console.log(formData)
                            })
                    })
                }))
        }
    }))

fetch('/AllMyChats', {
    headers: {
        "Content-Type": "application/json"
    },
    mode: "cors"
})
    .then(res => res.json())
    .then(data => data.forEach(item => {
        console.log(item)
        let list_my_contacts = document.querySelector('.list_my_contacts')
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

        let btn_send_message = document.querySelector('.btn_send_message')
        btn_send_message.addEventListener('click', () => {
            console.log(item.username)
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
                    console.log(formData)
                })

            body.classList.add('none')

            close_window_1.classList.add('visible')
            chat_user_user.classList.add('visible')
            header_contacts.classList.add('none')
        })

        close_window_1.addEventListener('click', () => {
            close_window_1.classList.remove('visible')
            body.classList.remove('none')
            chat_user_user.classList.remove('visible')
            header_contacts.classList.remove('none')
        })
    }))