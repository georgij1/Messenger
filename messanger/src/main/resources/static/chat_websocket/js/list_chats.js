let list_chats = document.querySelectorAll('.list_chats')
let btn_nav_chat = document.querySelectorAll('.btn_nav_chat')
let all_chat = document.querySelector('.all_chat')
let content_all_chat = document.querySelector('.content_all_chat')
let content_all_my_chat = document.querySelector('.content_all_my_chat')
let all_my_chat = document.querySelector('.all_my_chat')


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

for (let list_chat_itter of list_chats) {
        console.log('ListChats')

        fetch('/list_chats', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors"
        })
            .then(response => response.json())
            .then((data) => {
                data.forEach(item => {
                    console.log(item)
                    console.log(item.id)
                    for (let list_chats_itter of list_chats) {
                        list_chats_itter.innerHTML += `
                        <div class="chat">
                            <!--<div class="id">${item.id}</div>-->
                            <div class="image"></div>
                            <div class="about_chat">
                                <div class="name">${item.name}</div>
                                <!--<div class="desc_chat">Описание: ${item.desc_chat}</div>-->
                            </div>
                        </div>
                    `
                        let image_user_1 = document.querySelectorAll('.image');
                        for (let image_user_new of image_user_1) {
                            image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                            image_user_new.style.backgroundSize = `80%`
                            // image_user_1.style.width = `10%`
                            image_user_new.style.borderRadius = `50px`
                            image_user_new.style.height = '60px'
                            image_user_new.style.boxShadow = '0 0 10px bisque'
                        }
                    }

                    console.log(item)

                    if (item.name === "") {
                        list_chat_itter.innerText='Чатов нет'
                        console.log('ListChats = 0')
                    }

                    else {
                        console.log('ListChats > 0')
                    }

                    let chat = document.querySelectorAll('.chat')
                    let body_chat = document.querySelector('.body_chat')
                    let body_class = document.querySelector('.body')
                    let body_1_class = document.querySelector('.body_1')
                    let header = document.querySelector('.header')
                    let content = document.querySelector('.content')

                    for (let chat_itter of chat) {
                        chat_itter.addEventListener('click', (event) => {
                            body_chat.classList.toggle('visible')
                            body_class.classList.toggle('none')
                            body_1_class.classList.toggle('none')
                            console.log("ItemName - " + item.name)
                            let border_name_chat = document.querySelector('.border_name_chat')
                            border_name_chat.innerText = event.currentTarget.children[1].children[0].textContent
                            header.classList.toggle('none')
                            console.log(event.currentTarget.children[1].children[0].textContent)
                            console.log("event - " + event.currentTarget.children[0].textContent)
                            // console.log(event)
                            let chat_id_var = item.id
                            console.log("chat_id_var - " + chat_id_var)
                            let list_chat = document.querySelector('.list_chat')
                            chat_itter.addEventListener('click', connect())

                            function sendMessage(event) {
                                let messageInput = document.querySelector('.form-control');
                                let messageContent = messageInput.value.trim();

                                const formData = {
                                    "username": document.querySelector('.username').textContent
                                }

                                if (messageContent && stompClient) {
                                    fetch('/username', {
                                        method: 'POST',
                                        headers: new Headers({
                                            'Content-Type': 'application/json'
                                        }),
                                        body: JSON.stringify(formData),
                                        mode: "cors"
                                    })
                                        .then(response => response.json())
                                        .then((data) => {
                                            data.forEach(item => {
                                                console.log(event.currentTarget)
                                                console.log("websocket id - " + item.id)
                                                let item_id_user = item.id
                                                console.log(new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds())
                                                let Date_new = new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
                                                let chatMessage = {
                                                    sender: item_id_user,
                                                    content: messageInput.value,
                                                    chat_id: chat_id_var,
                                                    TimeStamp: Date_new,
                                                    type: 'CHAT'
                                                };
                                                console.log(chatMessage.TimeStamp)
                                                console.log(messageInput.value)
                                                stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
                                                messageInput.value = '';
                                                let list_chat = document.querySelector('.list_chat')
                                                list_chat.innerHTML += `
                                                    <div class="message">
                                                        <div class="text">${chatMessage.content}</div>
                                                        <div class="text">${chatMessage.TimeStamp}</div>
                                                        
                                                        <div class="tools_message">
                                                            <div class="delete_message"></div>
                                                            <div class="edit_message"></div>
                                                            <div class="share_message"></div>
                                                        </div>
                                                    </div>
                                                `
                                                let delete_message = document.querySelectorAll('.delete_message')
                                                console.log(delete_message)
                                                for (let delete_message_itter of delete_message) {
                                                    delete_message_itter.addEventListener('click', () => {
                                                        console.log(delete_message)
                                                        console.log(item.id)
                                                        fetch(`/delete_message/${item.id}`, {
                                                            method: 'delete',
                                                            headers: {
                                                                "Content-Type": "application/json"
                                                            },
                                                            mode: "cors"
                                                        })
                                                            .catch(err => {
                                                                console.log(err)
                                                            })
                                                            .then(res => {
                                                                console.log(res)
                                                                console.log(item.id)
                                                                alert('Сообщение - ' + item.content + ' успешно удалено')
                                                                // window.location.reload()
                                                            })
                                                        // stompClient.send(`/app/chat.deleteMessage/${formData.id}`, {}, JSON.stringify(chatMessage));
                                                    })
                                                }
                                            })
                                        })
                                }
                                event.preventDefault();
                            }

                            messageForm.addEventListener('submit', sendMessage, true)

                            fetch('/all_message', {
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                }),
                                mode: "cors"
                            })
                                .then((response) => {
                                    response.json().then(res => console.log(res.forEach(item => {
                                        console.log(item.text)
                                        list_chat.innerHTML +=
                                            `
                                    <div class="message">
                                        <div class="text">${item.text}</div>
                                        <div class="timestamp">${item.time_stamp}</div>
    
                                        <div class="tools_message">
                                            <div class="delete_message"></div>
                                            <div class="edit_message"></div>
                                            <div class="share_message"></div>
                                        </div>
                                    </div>
                                `
                                        let edit_message = document.querySelectorAll('.edit_message')
                                        let window_edit_message = document.querySelector('.window_edit_message')
                                        for (let edit_message_itter of edit_message) {
                                            edit_message_itter.addEventListener('click', () => {
                                                console.log(edit_message)
                                                console.log(item)
                                                window_edit_message.classList.add('flex')
                                                window_edit_message.innerHTML=`
                                                        <input class="input_edit_message" value="${item.text}" name="message">
                                                        <input type="button" class="save_edit_message" value="Сохранить">
                                                        <input type="button" class="cancel_edit_message" value="Закрыть">
                                                `
                                                let save_edit_message = document.querySelector('.save_edit_message')
                                                let input_edit_message = document.querySelector('.input_edit_message')
                                                let cancel_edit_message = document.querySelector('.cancel_edit_message')

                                                cancel_edit_message.addEventListener('click', () => {
                                                    window_edit_message.classList.remove('flex')
                                                })

                                                save_edit_message.addEventListener('click', () => {
                                                    console.log('id message')
                                                    console.log(item.id)
                                                    console.log('text message')
                                                    console.log(item.text)
                                                    console.log('input_edit_message.value')
                                                    console.log(input_edit_message.value)
                                                    window_edit_message.classList.remove('flex')

                                                    const formData = {
                                                        "message": input_edit_message.value
                                                    }

                                                    fetch(`/edit_message/${item.id}`, {
                                                        method: 'POST',
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify(formData)
                                                    })
                                                        .then(res => {console.log(res)})
                                                        .then(() => {
                                                            console.log(item.text)
                                                            window.location.reload()
                                                        })
                                                })
                                            })
                                        }

                                        let delete_message = document.querySelectorAll('.delete_message')
                                        console.log(delete_message)
                                        for (let delete_message_itter of delete_message) {
                                            delete_message_itter.addEventListener('click', () => {
                                                console.log(delete_message)
                                                console.log(item.id)
                                                fetch(`/delete_message/${item.id}`, {
                                                    method: 'delete',
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    mode: "cors"
                                                })
                                                    .catch(err => {
                                                        console.log(err)
                                                    })
                                                    .then(res => {
                                                        console.log(res)
                                                        alert('Сообщение - ' + item.text + ' успешно удалено')
                                                        window.location.reload()
                                                    })
                                            })
                                        }

                                        let share_message = document.querySelectorAll('.share_message')
                                        console.log('share_message')
                                        console.log(share_message)
                                        for (let share_message_itter of share_message) {
                                            console.log('share_content')
                                            console.log(item.text)
                                            share_message_itter.addEventListener('click', () => {
                                                window.open(`share/${item.text}`)
                                            })
                                        }
                                    })))
                                })
                        })

                        let close_window_2 = document.querySelector('.close_window_2')
                        close_window_2.addEventListener('click', () => {
                            let body_chat = document.querySelector('.body_chat')
                            body_chat.classList.remove('visible')
                            body_class.classList.remove('none')
                            body_1_class.classList.remove('none')
                            header.classList.remove('none')
                            window.location.reload()
                        })
                    }

                    let btn_create_chat = document.querySelector('.btn_create_chat')
                    btn_create_chat.addEventListener('click', () => {
                        let body_1_new_1 = document.querySelector('.body_1')
                        body_1_new_1.classList.remove('none')
                        let header = document.querySelector('.header')
                        header.classList.remove('visible')
                    })

                    let close_window_new = document.querySelector('.close_window_new')
                    close_window_new.addEventListener('click', () => {
                        let header = document.querySelector('.header')
                        header.classList.toggle('visible')
                        window.location.reload()
                    })

                    let border_name_chat_1 = document.querySelector('.border_name_chat')
                    let window_settings_chat = document.querySelector('.window_settings_chat')
                    let tools = document.querySelector('.tools')
                    let btn_down_1 = document.querySelector('.btn_down_1')
                    let close_window_2 = document.querySelector('.close_window_2')
                    let close_window_3 = document.querySelector('.close_window_3')
                    let list_chat = document.querySelector('.list_chat')
                    let height = document.querySelector('.height')
                    let list_users_open_settings = document.querySelector('.list_users_open_settings')
                    let image_chat_open_settings = document.querySelector('.image_chat_open_settings')

                    border_name_chat_1.addEventListener('click', () => {
                        window_settings_chat.classList.add('visible')
                        tools.classList.add('none')
                        btn_down_1.classList.add('none')
                        border_name_chat_1.classList.add('none')
                        close_window_2.classList.add('none')
                        close_window_3.classList.add('visible')
                        list_chat.classList.add('none')
                        height.classList.add('none')
                        console.log(item.owner)
                        list_users_open_settings.innerHTML=`
                            <div class="owner_chat">
                                <div class="owner">${item.owner}</div>
                                <span class="span">Админ</span>
                            </div>
                            <div class="users_chat_open_settings">
                                <div class="user_chat_open_settings">Пользователей пока нет</div>
                            </div>
                        `
                        image_chat_open_settings.innerHTML=`
                            <div class="image_chat_open_settings" style="background: url(${item.image_chat}) no-repeat center; width: 100%; height: 45vh; background-size: 90%; box-shadow: 0 0 10px burlywood; border-radius: 100%"></div>
                        `
                    })

                    close_window_3.addEventListener('click', () => {
                        window_settings_chat.classList.remove('visible')
                        tools.classList.remove('none')
                        btn_down_1.classList.remove('none')
                        border_name_chat_1.classList.remove('none')
                        close_window_2.classList.remove('none')
                        close_window_3.classList.remove('visible')
                        list_chat.classList.remove('none')
                        height.classList.remove('none')
                    })
                })
            })

        let close_window_new_2 = document.querySelector('.close_window_new')
        console.log(close_window_new_2)
        close_window_new_2.addEventListener('click', () => {
            let body_js = document.querySelector('.body_js')
            console.log(body_js)
            body_js.classList.remove('none')
        })

        let send_message = document.querySelector('.send_message')
        send_message.addEventListener('click', () => {
            let input_message = document.querySelector('.input_message')
            if (input_message.value === '') {
                console.log('str is empty')
                input_message.classList.toggle('red')
            } else {
                console.log("str isn't empty - " + input_message.value)
                input_message.classList.remove('red')
            }
        })
}