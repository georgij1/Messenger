class Offline {
    static get_offline_user () {
        fetch(`/status/offline/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => res)
    }
}