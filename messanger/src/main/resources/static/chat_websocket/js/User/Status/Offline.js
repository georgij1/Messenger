class Offline {
    get_offline_user () {
        fetch(`/status/offline/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
            .then(data => console.log(data))
    }

    constructor() {
        this.get_offline_user()
    }
}