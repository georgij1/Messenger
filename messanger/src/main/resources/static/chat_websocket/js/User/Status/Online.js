class Online {
    static get_online_user () {
        fetch(`/status/online/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => res)
    }
}