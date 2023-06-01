let IdUser1 = document.querySelector('.username')

document.addEventListener("visibilitychange", function(){
    if (document.hidden){
        console.log('Вкладка не активна');

        fetch(`/status/offline/${document.querySelector('.border_name_chat').textContent}/${IdUser1.textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
    }

    else {
        console.log('Вкладка активна');

        fetch(`/status/online/${document.querySelector('.border_name_chat').textContent}/${IdUser1.textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
    }
});

window.addEventListener('load', function(e) {
    if (navigator.onLine) {
        for (let BorderNameChatItter of document.querySelectorAll('.name_chat_min_window')) {
            console.log(BorderNameChatItter)
            console.log('в сети');
            console.log(BorderNameChatItter.textContent)
            console.log(IdUser1.textContent)
            fetch(`/status/online/${BorderNameChatItter.textContent}/${IdUser1.textContent}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),

                mode: "cors"
            })
                .then(res => console.log(res.json()))
        }
    }

    else {
        console.log('Не в сети')
        console.log(IdUser1.textContent)
        fetch(`/status/offline/${border_name_chat}/${IdUser1.textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
    }
}, false);

window.addEventListener('online', function(e) {
    console.log('Я вернулся');
    console.log(IdUser1.textContent)
    fetch(`/status/online/chat/${IdUser1.textContent}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),

        mode: "cors"
    })
        .then(res => console.log(res.json()))
}, false);

window.addEventListener('offline', function(e) {
    console.log('Не в сети');
    console.log(IdUser1.textContent)
    fetch(`/status/offline/chat/${IdUser1.textContent}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),

        mode: "cors"
    })
        .then(res => console.log(res.json()))
}, false);