class Online {
    get_online_user () {
        fetch(`/status/online/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
            .then(data => console.log(data))
    }

    constructor() {
        this.get_online_user()
    }
}