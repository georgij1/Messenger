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
let ErrorConnect = document.querySelector('.ErrorConnect')

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
                        for (let UserDivItter of document.querySelectorAll('.UserDiv')) {
                            UserDivItter.addEventListener('click', (event) => {
                                console.log(event.currentTarget.children[1])
                                window.open(`AccountPage/${event.currentTarget.children[1].textContent}`, '_self')
                            })
                        }
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
            // document.querySelector('.btn_down_1').classList.add('none')
            console.log(item.id_image)
            if (item.id_image === "TextMessage") {
                list_chat.innerHTML += `
                    <div class="MessageMain">
                        <div class="ImageProfileMessage"></div>
                        
                        <div class="message">
                        
                            <div class="ItemUsername">${item.username}</div>
                            
                            <div class="id">${item.id_message}</div>
                            <div class="text" title="Скопировать текст">${item.text}</div>
    
                            <div class="tools_message">
                                <div class="delete_message"></div>
                                <div class="edit_message"></div>
                                <div class="share_message"></div>
                            </div>
                            
                            <div class="ToolsTick">
                                <div class="ReadMessage">Прочитано</div>
                                <div class="GetMessage">Получено</div>
                            </div>
                         
                            <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                        </div>
                    </div>
                `
            }

            else if (item.text === null) {
                list_chat.innerHTML +=
                    `
                        <div class="ImageBorder">
                            <div class="ImageChat_1">
                                <img class="ImageChat" src="/files/${item.id_image}" alt="">
                                <div class="UrlImageChat">/files/${item.id_image}</div>
                            </div>
                        
                            <div class="tools_message">
                                <div class="delete_message_image"></div>
                                <div class="share_message_image"></div>
                            </div>
                            
                            <div class="ToolsTick">
                                <div class="ReadMessage">Прочитано</div>
                                <div class="GetMessage">Получено</div>
                            </div>
                            
                            <div class="ImageTimeStampShort" title="${item.time_stamp_long}">${item.time_stamp_short}</div>
                        </div>
                    `
            }

            else if (item.text != null) {
                list_chat.innerHTML +=
                    `
                        <div class="ImageBorder">
                            <div class="ImageChat_1">
                                <img class="ImageChat" src="/files/${item.id_image}" alt="">
                                <div class="UrlImageChat">/files/${item.id_image}</div>
                            </div>
                            
                            <div class="TextImage">${item.text}</div>
                        
                            <div class="tools_message">
                                <div class="delete_message_image"></div>
                                <div class="share_message_image"></div>
                            </div>
                            
                            <div class="ToolsTick">
                                <div class="ReadMessage">Прочитано</div>
                                <div class="GetMessage">Получено</div>
                            </div>
                            
                            <div class="ImageTimeStampShort" title="${item.time_stamp_long}">${item.time_stamp_short}</div>
                        </div>
                    `
            }

            let ImageChat = document.querySelectorAll('.ImageChat_1')

            for (let ImageBorderItter of document.querySelectorAll('.ImageBorder')) {
                ImageBorderItter.addEventListener('click', (event) => {
                    event.currentTarget.children[1].classList.toggle('flex')
                    event.currentTarget.children[2].classList.toggle('flex')
                    ImageBorderItter.classList.toggle('ImageBorderClick')
                })
            }

            for (let ImageChatItter of ImageChat) {
                console.log(ImageChatItter)
                ImageChatItter.addEventListener('click', (event) => {
                    console.log(event.currentTarget.children[1].textContent)
                    window.open(event.currentTarget.children[1].textContent, '_self')
                })
            }

            for (let MessageMainItter of document.querySelectorAll('.MessageMain')) {
                MessageMainItter.addEventListener('click', (event) => {
                    let EventUserName = event.currentTarget.children[1].children[0].textContent

                    console.log(EventUserName)

                    for (let ImageProfileMessageItter of document.querySelectorAll('.ImageProfileMessage')) {
                        console.log(ImageProfileMessageItter)
                        ImageProfileMessageItter.addEventListener('click', () => {
                            window.open(`AccountPage/${EventUserName}`, '_self')
                        })
                    }
                })
            }

            for (let message of document.querySelectorAll('.message')) {
                console.log(message)
                message.addEventListener('click', (event) => {
                    // event.currentTarget.children[1].children[4].classList.toggle('flex')
                    // event.currentTarget.children[1].children[3].classList.toggle('flex')
                    event.currentTarget.children[3].classList.toggle('flex')
                    event.currentTarget.children[4].classList.toggle('flex')
                    console.log(event.currentTarget)
                    console.log('without websocket')

                    let EventIDMessage = event.currentTarget.children[1]

                    let EventText = event.currentTarget.children[2]
                    console.log(EventText.textContent)

                    let delete_message = document.querySelectorAll('.delete_message')
                    for (let delete_message_itter of delete_message) {
                        delete_message_itter.addEventListener('click', () => {
                            console.log(EventIDMessage.textContent)
                            fetch(`/delete_message/${EventIDMessage.textContent}`, {
                                method: 'delete',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors"
                            })
                                .then(res => {
                                    alert('Сообщение - ' + item.text + ' успешно удалено')
                                    console.log(res)
                                    // window.location.reload()
                                })
                        })
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
                                <textarea class="input_edit_message" name="message">${EventText.textContent}</textarea>
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
                                    fetch(`/edit_message/${EventIDMessage.textContent}`, {
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
                                    alert('Сообщение не обновлено так как оно пустое или такой же контент')
                                }
                            })
                        })
                    }
                })
            }

            let text = document.querySelectorAll('.text')

            for (let TextItter of text) {
                TextItter.addEventListener('click', () => {
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

                    copyTextToClipboard(`${TextItter.textContent}`);

                    console.log(text)

                    for (let ToolsMessageItter of document.querySelectorAll('.tools_message')) {
                        ToolsMessageItter.classList.remove('flex')
                    }

                    for (let ToolsTickItter of document.querySelectorAll('.ToolsTick')) {
                        ToolsTickItter.classList.remove('flex')
                    }
                })
            }

            let ItemUsername = document.querySelectorAll('.ItemUsername')
            for (let ItemUsernameItter of ItemUsername) {
                ItemUsernameItter.addEventListener('click', (event) => {
                    console.log(event.currentTarget.textContent)
                    window.open(`AccountPage/${event.currentTarget.textContent}`, '_self')
                    let EventUserName = event.currentTarget.textContent
                })
            }

            for (let ImageProfileMessageItter of document.querySelectorAll('.ImageProfileMessage')) {
                ImageProfileMessageItter.style.background=`url(${item.image})` + 'no-repeat center'
                ImageProfileMessageItter.style.backgroundSize='40px'
            }

            for (let ShareMessageItter of document.querySelectorAll('.share_message')) {
                ShareMessageItter.addEventListener('click', () => {
                    window.open(`/share/${item.text}`, '_self')
                })
            }
        })))

        if (list_chat.clientHeight === 0) {
            // btn_down_1.classList.add('none')
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
            ListUploadedImage.innerHTML+=`<div class="link_image">files/${item.id_image}</div>`
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
    // btn_down_1.classList.add('none')
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
    // btn_down_1.classList.remove('none')
    tools.classList.remove('none')
    height.classList.remove('none')
    ToolsAdmin.classList.add('visible')
})

send_message.addEventListener('click', () => {
    if (input_message.value === '') {
        console.log('str is empty')
        input_message.classList.remove('red')
    }

    else {
        input_message.classList.remove('red')
    }
})

send_message.addEventListener('input', () => {
    if (input_message.value.length > 0) {
        input_message.classList.remove('red')
    }

    else {
        input_message.classList.add('red')
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

        ErrorConnect.classList.remove('block')

        console.log(socket)
    }

    console.log('connect')
}

function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);

    console.log('onConnected')

    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
}

function onMessageReceived(payload) {
    let message = JSON.parse(payload.body);

    console.log('onMessageReceived')

    let messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.EventInviteSender = message.sender;
        message.EventInvite = 'онлайн';
        ErrorConnect.classList.remove('block')
    }

    else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.EventLogout = message.sender + 'офлайн';
        ErrorConnect.classList.remove('block')
    }

    else if (message.type === 'SEND') {
        ErrorConnect.classList.remove('block')
    }

    else if (message.type === 'Whoops! Lost connection to http://localhost:8080/ws') {
        ErrorConnect.classList.add('block')
    }

    let textElementInvite = document.createElement('p');
    let textElementLogOut = document.createElement('p');
    let textChat = document.createElement('p');
    let messageEventInvite = document.createTextNode(message.EventInvite);
    let messageEventSender = document.createTextNode(message.EventInviteSender)
    let messageEventLogout = document.createTextNode(message.EventLogout);
    let TextChat = document.createTextNode(message.content)
    let UsernameP = document.createElement('p')
    let PBlockTextOnline = document.createElement('p')

    textElementInvite.className='EventInvite'
    textElementLogOut.className='EventLogOut'

    textChat.className='TextChat'
    UsernameP.className='UserNameEventLink'

    console.log(message)

    if (message.type === 'JOIN') {
        messageElement.appendChild(textElementInvite)
        textElementInvite.appendChild(UsernameP)
        textElementInvite.appendChild(PBlockTextOnline)
        UsernameP.appendChild(messageEventSender)
        PBlockTextOnline.appendChild(messageEventInvite)
        messageAreaNew.appendChild(messageElement);
        messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;
        console.log('if')
    }

    else if (message.type === 'LEAVE') {
        messageElement.appendChild(textElementLogOut)
        textElementLogOut.appendChild(messageEventLogout)
        messageAreaNew.appendChild(messageElement);
        messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;
    }

    else {
        // textChat.appendChild(TextChat)
        messageElement.appendChild(textChat);
        messageAreaNew.appendChild(messageElement);
        messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;
        console.log('else')
    }

    let UserNameEventLink = document.querySelectorAll('.UserNameEventLink')

    for (let UserNameEventLinkItter of UserNameEventLink) {
        UserNameEventLinkItter.addEventListener('click', (event) => {
            window.open(`AccountPage/${event.currentTarget.textContent}`, '_self')
        })
    }

    console.log(payload)
    console.log(payload.body)
}

function ErrorSocket() {
    ErrorConnect.classList.add('block')
}

connect()