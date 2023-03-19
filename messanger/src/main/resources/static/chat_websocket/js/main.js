/*TODO: Надо научить фронт принудительно выкинуть клиенты из websocket ну и бэк если понадобиться*/

'use strict';
let usernamePage = document.querySelector('#username-page');
let chatPage = document.querySelector('#chat-page');
let usernameForm = document.querySelector('#usernameForm');
let messageForm = document.querySelector('#messageForm');
let messageInput = document.querySelector('#message');
let messageArea = document.querySelector('#messageArea');
let connectingElement = document.querySelector('.connecting');

let stompClient = null;
let username = null;

let colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {
    username = document.querySelector('#name').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        let socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
    alert('Произошла ошибка. Страница будет перезагружена')
    window.location.reload()
}


function sendMessage(event) {
    let messageContent = messageInput.value.trim();
    if(messageContent && stompClient) {
        let chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
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

    else {
        messageElement.classList.add('chat-message');

        let avatarElement = document.createElement('i');
        let avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        let usernameElement = document.createElement('span');
        let usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    let textElement = document.createElement('p');
    let messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

function log_out_websocket() {
    
}


function getAvatarColor(messageSender) {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    let index = Math.abs(hash % colors.length);
    return colors[index];
}

usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)

fetch('http://localhost:8080/all_message',{
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => console.log(data.forEach((item) => {
        let all_message = document.querySelector('#messageArea');
        let hash = 0;
        for (let i = 0; i < item.author.length; i++) {
            hash = 31 * hash + item.author.charCodeAt(i);
        }
        let index = Math.abs(hash % colors.length);
        all_message.innerHTML+=`
            <p class="content">
                <li class="chat-message">
                    <i style="background-color: ${colors[index]}">${item.author}</i>
                        
                    <span>${item.author}</span>
                        
                    <p>${item.message}</p>
                        
                        <div class="form_delete_message">
                            <input type="submit" class="delete_message_input" value="Удалить сообщение">
                        
                            <div class="form_edit_message">
                                <input type="button" class="edit_message" value="Редактировать сообщение">
                                <input class="edit_message" placeholder="edit_message">
                            </div>
                        </div>
                </li>
        `
        let form_delete_message = document.querySelectorAll('.form_delete_message')
        for (let form_delete_message_1 of form_delete_message) {
            form_delete_message_1.addEventListener('click', () => {
                fetch(`/delete_message/${item.id}`, {
                    method: 'delete',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    mode: "cors"
                })
                    .catch(err => {console.log(err)})
                    .then(res => {
                        console.log(res)
                    })
                // .then(() => {window.location.reload()})
            })
        }
        let item_author = `${item.author}`
        let item_length = item_author.length
        console.log(item_author)
        console.log(item_author[0].slice(item_length))

        let edit_message = document.querySelector('.edit_message')
        edit_message.addEventListener('click', () => {console.log('edit_message')})
    })));

let all_users = document.querySelector('.all_users')
fetch('/all_users', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => console.log(data.forEach((item) => {
        console.log("item.username - " + item.username)
        console.log("data - " + data)
        let div_create = document.createElement('div')
        // all_users.innerHTML=`${item.username}`
        // all_users.innerHTML=`${div_create}`
        all_users.appendChild(div_create)
        div_create.append(item.username)
        div_create.className='option'
        div_create.addEventListener('click', () => {
            // username_page_container.classList.add('visible')
            // body.classList.add('window')
            // text_choose_chat.classList.add('not_visible')
            // close_window.classList.add('visible')
            // close_window.style.display='block'
            console.log(item.username)
            fetch('/get_chat', {})
                .then(res => {console.log(res)})
        })
        // all_users.innerHTML=`<div class="option">${item.username}</div>`
    })));

let option = document.querySelectorAll('.option')
let username_page_container = document.querySelector('.username-page-container')
let body = document.querySelector('body')
let arrow_close = document.querySelector('.arrow_close')

for (let itter_option of option) {
    itter_option.addEventListener('click', () => {
        username_page_container.classList.add('visible')
        body.classList.add('window')
        arrow_close.style.display='block'
    })
}

arrow_close.addEventListener('click', () => {
    username_page_container.classList.remove('visible')
    body.classList.remove('visible')
    arrow_close.style.display='none'
})

console.log(arrow_close)