let IdChat = document.querySelector('.IdChat')
console.log(IdChat.textContent)
let list_chat = document.querySelector('.list_chat')
let border_name_chat = document.querySelector('.border_name_chat')
let title = document.querySelector('.title')
let image_chat_open_settings = document.querySelector('.image_chat_open_settings')
let list_users_open_settings = document.querySelector('.list_users_open_settings')
let admin_chat = document.querySelector('.admin_chat')
let window_settings_chat = document.querySelector('.window_settings_chat')
let btn_down_1 = document.querySelector('.btn_down_1')
let tools = document.querySelector('.tools')
let height = document.querySelector('.height')
let close_window_3 = document.querySelector('.close_window_3')
let btn_tools_chat = document.querySelector('.btn_tools_chat')
let window_add_file = document.querySelector('.window_add_file')
let flex_content_chat_top_tools = document.querySelector('.flex_content_chat_top_tools')
let btn_close_add_file = document.querySelector('.btn_close_add_file')
let ListUploadedImage = document.querySelector('.ListUploadedImage')
let send_message = document.querySelector('.send_message')
let messageForm = document.querySelector('#messageForm');
let messageAreaNew = document.querySelector('.list_chat');
let stompClient = null;
let username = document.querySelector('.username').textContent
let input_message = document.querySelector('.input_message')
let ToolsAdmin = document.querySelector('.ToolsAdmin')

fetch(`/ChatName/${IdChat.textContent}`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    method: "POST",
    mode: "cors"
})
    .then((response) => {
        response.json().then(res => res.forEach(item => {
            border_name_chat.innerText=`${item.name}`
            title.innerText=`${item.name}`

            image_chat_open_settings.style.background=`url(${item.image_chat}) no-repeat center`
            image_chat_open_settings.style.height='45vh'
            image_chat_open_settings.style.backgroundSize='90%'
            image_chat_open_settings.style.boxShadow='0 0 10px burlywood'
            image_chat_open_settings.style.borderRadius='100%'

            admin_chat.innerText=`${item.owner}`

            fetch(`/Find/${item.name}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: "POST",
                mode: "cors"
            })

                .then((response) => {
                    console.log(response)
                    response.json().then(res => (res.forEach(item => {
                        list_users_open_settings.innerHTML+=`
                                <div class="UserDiv">
                                    <div class="UserChat" style="background: url(${item.image_user}) no-repeat; background-size: 71px; height: 60px; width: 70px"></div>
                                    <div class="UserChat">${item.name}</div>
                                </div>
                            `
                    })))
        })}))})

fetch(`/chats/${IdChat.textContent}`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    method: "POST",
    mode: "cors"
})
    .then((response) => {
        response.json().then(res => (res.forEach(item => {
            const MessageNullDiv = document.querySelector('.MessageNullDiv')
            MessageNullDiv.classList.add('none')
            list_chat.innerHTML +=
                `
                    <div class="MessageMain">
                        <div class="ImageProfileMessage"></div>
                        
                        <div class="message">
                        
                        <div class="ItemUsername">${item.username}</div>
                            <div class="id">${item.id}</div>
                            <div class="text">${item.text}</div>
    
                            <div class="tools_message">
                                <div class="delete_message"></div>
                                <div class="edit_message"></div>
                                <div class="share_message"></div>
                            </div>
                         
                            <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                        </div>
                    </div>
                    
                    <div class="ImageBorder">
                        <img class="ImageChat" src="/files/${item.id_image}" alt="">
                        <div class="TimeStampShort" title="${item.time_stamp_long_image}">${item.time_stamp_short_image}</div>
                    </div>
                `

            for (let MessageMainItter of document.querySelectorAll('.MessageMain')) {
                console.log(MessageMainItter)
                MessageMainItter.addEventListener('click', (event) => {
                    console.log(event)
                    event.currentTarget.children[1].children[3].classList.toggle('flex')
                })
            }

            for (let ImageProfileMessageItter of document.querySelectorAll('.ImageProfileMessage')) {
                ImageProfileMessageItter.style.background=`url(${item.image})` + 'no-repeat'
                ImageProfileMessageItter.style.backgroundSize='100px'
            }

            const edit_message = document.querySelectorAll('.edit_message')
            const window_edit_message = document.querySelector('.window_edit_message')
            const cancel_edit_message = document.querySelector('.cancel_edit_message')

            for (let edit_message_itter of edit_message) {
                edit_message_itter.addEventListener('click', () => {
                    height.classList.add('none')
                    list_chat.classList.add('none')
                    flex_content_chat_top_tools.classList.add('none')
                    window_edit_message.classList.add('flex')
                    cancel_edit_message.classList.add('block')
                    tools.classList.add('none')

                    window_edit_message.innerHTML=`
                        <textarea class="input_edit_message" value="${item.text}" name="message"></textarea>
                        <input type="submit" class="save_edit_message" value="Сохранить">
                    `

                    const save_edit_message = document.querySelector('.save_edit_message')
                    const input_edit_message = document.querySelector('.input_edit_message')

                    cancel_edit_message.addEventListener('click', () => {
                        window_edit_message.classList.remove('flex')
                        list_chat.classList.remove('none')
                        flex_content_chat_top_tools.classList.remove('none')
                        height.classList.remove('none')
                        tools.classList.remove('none')
                    })

                    save_edit_message.addEventListener('click', () => {
                        window_edit_message.classList.remove('flex')
                        list_chat.classList.remove('none')
                        flex_content_chat_top_tools.classList.remove('none')

                        const formData = {
                            "message": input_edit_message.value
                        }

                        if (input_edit_message.value.length > 0 && input_edit_message.value !== item.text) {
                            fetch(`/edit_message/${item.id}`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formData)
                            })
                                .then(() => {
                                    console.log(input_edit_message.value.length)
                                    console.log(item.text)
                                    // window.location.reload()
                                })
                        }

                        else {
                            alert('Сообщение не обновленно так как оно пустое или такой же контент')
                        }
                    })
                })
            }

            let delete_message = document.querySelectorAll('.delete_message')
            for (let delete_message_itter of delete_message) {
                delete_message_itter.addEventListener('click', () => {
                    fetch(`/delete_message/${item.id}`, {
                        method: 'delete',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        mode: "cors"
                    })
                        .then(res => {
                            alert('Сообщение - ' + item.text + ' успешно удалено')
                            window.location.reload()
                        })
                })
            }

            for (let ShareMessageItter of document.querySelectorAll('.share_message')) {
                ShareMessageItter.addEventListener('click', () => {
                    window.open(`/share/${item.text}`, '_self')
                })
            }
        })))

        if (list_chat.clientHeight === 0) {
            btn_down_1.classList.add('none')
            list_chat.innerHTML=`
                <div class="MessageNullDiv">
                    <div class="MessageListNull">
                        <div class="text">Сообщений нет начните общаться первым</div>
                        <div class="ImageMessageNull"></div>
                    </div>
                </div>
            `
        }
    })

btn_tools_chat.addEventListener('click', () => {
    window_add_file.classList.add('flex')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
    height.classList.add('none')
    tools.classList.add('none')

    fetch('/files', {
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
        .then(res => res.json())
        .then(data => data.forEach(item => {
            ListUploadedImage.innerHTML+=`<div class="link_image">files/${item.id}</div>`
            let link_image = document.querySelectorAll('.link_image')
            for (let LinkImage of link_image) {
                LinkImage.addEventListener('click', () => {
                    window.open(`/${LinkImage.textContent}`, '_self')
                })
            }
        }))
})

btn_close_add_file.addEventListener('click', () => {
    window_add_file.classList.remove('flex')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
    height.classList.remove('none')
    tools.classList.remove('none')
})

border_name_chat.addEventListener('click', () => {
    window_settings_chat.classList.add('visible')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
    btn_down_1.classList.add('none')
    tools.classList.add('none')
    height.classList.add('none')
    console.log("username - " + username)
    let admin_chat = document.querySelector('.admin_chat').textContent

    if (admin_chat === username) {
        ToolsAdmin.classList.add('flex')
    }

    else {
        ToolsAdmin.classList.remove('block')
    }

    let WindowAddUsers = document.querySelector('.WindowAddUsers')
    let WindowEditListUser = document.querySelector('.WindowEditListUser')
    let CloseWindow4 = document.querySelector('.close_window_4')
    let CloseWindow5 = document.querySelector('.close_window_5')

    document.querySelector('.AddUsersBtn').addEventListener('click', () => {
        CloseWindow4.classList.add('block')
        window_settings_chat.classList.add('none')
        WindowAddUsers.classList.add('block')

        fetch('/all_users', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors"
        })
            .then(response => response.json())
            .then((data) => {data.forEach(item => {
                document.querySelector('.ListUsersAddNewUserChat').innerHTML+=`
                <div class="user" id="user">
                    <!--<div class="id"></div>-->
                    <div class="user_image" style="background: url(${item.image}) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>${item.image}</p></div>
                    <div class="name">${item.username}</div>
                </div>
            `
                let user = document.querySelectorAll('.user')
                for (let UserItter of user) {
                    UserItter.addEventListener('click', (event) => {
                        console.log(event.currentTarget.children[1])
                        let NameUser = event.currentTarget.children[1].textContent
                        let chat_name = document.querySelector('.border_name_chat').textContent
                        let image_user = event.currentTarget.children[0].children[0].textContent
                        let AddSaveBtnUserChat = document.querySelector('.AddSaveBtnUserChat')
                        AddSaveBtnUserChat.classList.add('block')
                        AddSaveBtnUserChat.addEventListener('click', () => {
                            console.log(NameUser)
                            console.log(chat_name)
                            console.log(image_user)
                            let FormData = {
                                "name": NameUser,
                                "image_user": image_user,
                                "chat_name": chat_name
                            }
                            fetch('/AddUserChatAdmin', {
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                }),
                                mode: "cors",
                                method: "POST",
                                body: JSON.stringify(FormData)
                            })
                                .then(res => console.log(res))
                                .then(() => alert('Пользователь / пользователи добавлены'))
                                .then(() => window.location.reload())
                        })
                    })
                }
            })})
    })

    document.querySelector('.EditChatUser').addEventListener('click', () => {
        CloseWindow5.classList.add('block')
        WindowEditListUser.classList.add('block')
        window_settings_chat.classList.add('none')
        let chat_name = document.querySelector('.border_name_chat').textContent
        console.log(chat_name)
        fetch(`/Find/${chat_name}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors",
            method: 'POST'
        })
            .then(response => response.json())
            .then((data) => {data.forEach(item => {
                document.querySelector('.ListUsersEdit').innerHTML += `
                    <div class="Username">
                        <div class="user" id="user">
                            <div class="id">${item.id}</div>
                            <div class="user_image" style="background: url(${item.image_user}) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>${item.image}</p></div>
                            <div class="name">${item.name}</div>
                        </div>
                        
                        <div class="DeleteBtn">Удалить</div>
                    </div>
                `
                let DeleteBtn = document.querySelectorAll('.DeleteBtn')
                for (let DeleteBtnItter of DeleteBtn) {
                    DeleteBtnItter.addEventListener('click', (event) => {
                        let Username = document.querySelectorAll('.Username')
                        for (let UsernameItter of Username) {
                            UsernameItter.addEventListener('click', (event) => {
                                console.log(event.currentTarget.children[0].children[0].textContent)

                                fetch(`/DeleteUser/${event.currentTarget.children[0].children[0].textContent}`, {
                                    headers: new Headers({
                                        'Content-Type': 'application/json'
                                    }),
                                    mode: "cors",
                                    method: 'DELETE'
                                })
                                    .then(res => console.log(res))
                                    .then(() => alert('Пользователь удалён из чата'))
                                    .then(() => window.location.reload())
                            })
                        }
                    })
                }
            })})
    })

    CloseWindow4.addEventListener('click', () => {
        window.location.reload()
    })

    CloseWindow5.addEventListener('click', () => {
        window.location.reload()
    })
})

close_window_3.addEventListener('click', () => {
    window_settings_chat.classList.remove('visible')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
    btn_down_1.classList.remove('none')
    tools.classList.remove('none')
    height.classList.remove('none')
    ToolsAdmin.classList.add('visible')
})

send_message.addEventListener('click', () => {
    if (input_message.value === '') {
        console.log('str is empty')
    }

    else {
        input_message.classList.remove('red')
    }
})

let list_link_chat = document.querySelector('.list_link_chat')
console.log(document.location.href)
list_link_chat.innerHTML=`
    <div class="LinkChat">${document.location.href}</div>
    <div class="CopyBtnChat">Скопироавть ссылку на чат</div>
`

let LinkChat = document.querySelector('.LinkChat')
LinkChat.addEventListener('click', () => {
    if (LinkChat.textContent === document.location.href) {
        alert('Вы уже на это странице')
    }

    else {
        window.open(`${document.location.href}`)
    }
})

let CopyBtnChat = document.querySelector('.CopyBtnChat')
CopyBtnChat.addEventListener('click', () => {
    function copyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.className = 'textArea'

        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'Успешно' : 'Не успешно';
            alert('Текст скопирован - ' + msg)
        }

        catch (err) {
            console.log('Что - то пошло не так');
        }

        document.body.removeChild(textArea);
    }

    copyTextToClipboard(`${LinkChat.textContent}`);
})

function connect() {
    username = document.querySelector('.username').textContent;

    if (username) {
        let socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, ErrorSocket);
    }
}

function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
}

function onMessageReceived(payload) {
    let message = JSON.parse(payload.body);

    let messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' присоединился!';
    }

    else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' вышел!';
    }

    let textElement = document.createElement('p');
    let messageText = document.createTextNode(message.content);

    textElement.appendChild(messageText);

    // messageElement.appendChild(textElement);

    messageAreaNew.appendChild(messageElement);
    messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;

    console.log(payload)
}

function ErrorSocket() {
    alert('страница будет перезагружена')
    window.location.reload()
}

connect()