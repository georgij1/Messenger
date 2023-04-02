let messageForm = document.querySelector('#messageForm');
let messageArea = document.querySelector('.list_chat');

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

    messageArea.appendChild(messageElement);
    messageArea.scrollMarginBottom = messageArea.scrollHeight;

    console.log(payload)
}

function ErrorSocket() {
    console.log('Произошла ошибка возможно сервер упал')
}