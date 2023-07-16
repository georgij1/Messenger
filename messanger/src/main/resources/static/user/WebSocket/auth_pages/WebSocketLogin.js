let ErrorConnectServer = document.querySelector('.status_websocket_error')

function ConnectWS () {
    let socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, ErrorSocket);
}

function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: 'Имя', type: 'JOIN'})
    )
}

function onMessageReceived(payload) {
    let message = JSON.parse(payload.body)

    if (message.type === 'JOIN') {
        ErrorConnectServer.classList.remove('block')

        window.addEventListener('unload', () => {
            ErrorConnectServer.classList.add('block')
        });
    }

    else if (message.type === 'LEAVE') {
        ErrorConnectServer.classList.add('block')
    }

    else if (message.type === 'Whoops! Lost connection to http://localhost:8080/ws') {
        ErrorConnectServer.classList.add('block')
    }
}

function ErrorSocket() {
    fetch('/connect', {
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        method: 'GET'
    })
        .catch(() => ErrorConnectServer.classList.add('block'))
        .then(res => res.json())
        .catch(() => {
            ErrorConnectServer.classList.add('block')
        })
        .then(data => (item => {
            console.log(item.ok)
            if (item === 'ok') {
                ErrorConnectServer.classList.remove('block')
            }
        }))
}

ConnectWS()
ErrorSocket()

document.querySelector('.status_websocket_error').addEventListener('click', () => {
    window.location.reload()
})