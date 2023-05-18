let ErrorConnectServer = document.querySelector('.ErrorConnect')

function ConnectWS () {
    username = document.querySelector('.username').textContent

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
    let message = JSON.parse(payload.body)

    if (message.type === 'JOIN') {
        document.querySelector('.status').classList.add('block')
        console.log(document.querySelector('.username').textContent)
        fetch(`/status/online/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))

        window.addEventListener('unload', () => {
            console.log('window is closed')
        });
    }

    else if (message.type === 'LEAVE') {
        ErrorConnectServer.classList.add('block')
        fetch(`/status/offline/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
    }

    else if (message.type === 'Whoops! Lost connection to http://localhost:8080/ws') {
        ErrorConnectServer.classList.add('block')
        fetch(`/status/offline/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
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
        .catch(() => console.log(`json isn't valid`))
        .then(data => (item => {
            console.log(item.ok)
            if (item === 'ok') {
                ErrorConnectServer.classList.remove('block')
                console.log('connect to server is success')
            }
        }))
}

ConnectWS()
ErrorSocket()

document.addEventListener("visibilitychange", function(){
    if (document.hidden){
        console.log('Вкладка не активна');
        fetch(`/status/offline/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
            .then(data => console.log(data))
    }

    else {
        console.log('Вкладка активна');
        fetch(`/status/online/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
            .then(data => console.log(data))
    }
})

window.addEventListener("visibilitychange", function(){
    if (window.hidden){
        console.log('Окно не активно');
        fetch(`/status/offline/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
            .then(data => console.log(data))
    }

    // else {
    //     console.log('Окно активно');
    //     fetch(`/status/online/${document.querySelector('.username').textContent}`, {
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         }),
    //
    //         mode: "cors"
    //     })
    //         .then(res => console.log(res.json()))
    //         .then((data) => console.log(data))
    // }
})