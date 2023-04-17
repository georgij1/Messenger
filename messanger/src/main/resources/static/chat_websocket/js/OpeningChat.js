let IdChat = document.querySelector('.IdChat')
console.log(IdChat.textContent)
let list_chat = document.querySelector('.list_chat')
let border_name_chat = document.querySelector('.border_name_chat')
let title = document.querySelector('.title')
let image_chat_open_settings = document.querySelector('.image_chat_open_settings')
let list_users_open_settings = document.querySelector('.list_users_open_settings')
let admin_chat = document.querySelector('.admin_chat')

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

            // Пользователи чата
            console.log(item.name)
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
                        console.log(res)
                        console.log(item.name)
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
            console.log(item)
            console.log(item.text)
            let MessageNullDiv = document.querySelector('.MessageNullDiv')
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
                `
            let MessageMain = document.querySelectorAll('.MessageMain')

            console.log(MessageMain)

            for (let MessageMainItter of MessageMain) {
                console.log(MessageMainItter)
                MessageMainItter.addEventListener('click', (event) => {
                    console.log('click')
                    console.log(event.currentTarget.children[1].children[3])
                    event.currentTarget.children[1].children[3].classList.toggle('flex')
                })
            }

            let ImageProfileMessage = document.querySelectorAll('.ImageProfileMessage')
            for (let ImageProfileMessageItter of ImageProfileMessage) {
                ImageProfileMessageItter.style.background=`url(${item.image})` + 'no-repeat'
                ImageProfileMessageItter.style.backgroundSize='100px'
            }

            let edit_message = document.querySelectorAll('.edit_message')
            let window_edit_message = document.querySelector('.window_edit_message')
            for (let edit_message_itter of edit_message) {
                edit_message_itter.addEventListener('click', () => {
                    console.log(edit_message)
                    console.log(item)
                    list_chat.classList.add('none')
                    flex_content_chat_top_tools.classList.add('none')
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
                        list_chat.classList.remove('none')
                        flex_content_chat_top_tools.classList.remove('none')
                    })

                    save_edit_message.addEventListener('click', () => {
                        console.log('id message')
                        console.log(item.id)
                        console.log('text message')
                        console.log(item.text)
                        console.log('input_edit_message.value')
                        console.log(input_edit_message.value)
                        window_edit_message.classList.remove('flex')
                        list_chat.classList.remove('none')
                        flex_content_chat_top_tools.classList.remove('none')

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

let btn_tools_chat = document.querySelector('.btn_tools_chat')
let window_add_file = document.querySelector('.window_add_file')
let flex_content_chat_top_tools = document.querySelector('.flex_content_chat_top_tools')
let btn_close_add_file = document.querySelector('.btn_close_add_file')
let ListUploadedImage = document.querySelector('.ListUploadedImage')

btn_tools_chat.addEventListener('click', () => {
    window_add_file.classList.add('flex')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
    height.classList.add('none')
    tools.classList.add('none')
    fetch('http://localhost:8080/files', {
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
        .then(res => res.json())
        .then(data => data.forEach(item => {
            console.log(item)
            ListUploadedImage.innerHTML+=`<div class="link_image">${item.url}</div>`
            let link_image = document.querySelectorAll('.link_image')
            for (let LinkImage of link_image) {
                LinkImage.addEventListener('click', () => {
                    // console.log(LinkImage.textContent)
                    window.open(`${LinkImage.textContent}`, '_self')
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

let window_settings_chat = document.querySelector('.window_settings_chat')
let btn_down_1 = document.querySelector('.btn_down_1')
let tools = document.querySelector('.tools')
let height = document.querySelector('.height')

border_name_chat.addEventListener('click', () => {
    window_settings_chat.classList.add('visible')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
    btn_down_1.classList.add('none')
    tools.classList.add('none')
    height.classList.add('none')
})

let close_window_3 = document.querySelector('.close_window_3')
close_window_3.addEventListener('click', () => {
    window_settings_chat.classList.remove('visible')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
    btn_down_1.classList.remove('none')
    tools.classList.remove('none')
    height.classList.remove('none')
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
    console.log(LinkChat.textContent)

    function copyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';

        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'Успешно' : 'Не успешно';
            console.log('Скопированный текст был таким - ' + msg);
        }

        catch (err) {
            console.log('Что - то пошло не так');
        }

        document.body.removeChild(textArea);
    }

    copyTextToClipboard(`${LinkChat.textContent}`);
})

let messageForm = document.querySelector('#messageForm');
let messageAreaNew = document.querySelector('.list_chat');

let stompClient = null;
let username = document.querySelector('.username').textContent
console.log(username)


function connect() {
    username = document.querySelector('.username').textContent;
    console.log(username)

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
    console.log('Произошла ошибка возможно сервер упал')
    alert('траница будет перезагружена')
    window.location.reload()
}

connect()