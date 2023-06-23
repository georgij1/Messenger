class ErrorSocket {
    connect_server () {
        fetch('/connect', {
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: 'GET'
        })
            .catch(() => {
                ErrorConnect.classList.add('flex')
                document.querySelector('.BorderImageChat').classList.add('none')
                document.querySelector('.border_name_chat').classList.add('none')
                document.querySelector('.close_window_2').classList.add('none')
                document.querySelector('.flex_content_chat_top_tools').classList.add('error_content')
            })
            .then(res => res.json())
            .catch(() => console.log(`json isn't valid`))
            .then(() => (item => {
                console.log(item.ok)
                if (item === 'ok') {
                    document.querySelector('.flex_content_chat_top_tools').classList.remove('error_content')
                    ErrorConnect.classList.remove('flex')
                    console.log('connect to server is success')
                    document.querySelector('.BorderImageChat').classList.remove('none')
                    document.querySelector('.border_name_chat').classList.remove('none')
                    document.querySelector('.close_window_2').classList.remove('none')
                }
            }))
    }

    constructor() {
        this.connect_server()
    }
}