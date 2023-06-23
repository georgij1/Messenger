class BtnDeleteChat {
    BtnDeleteChatAdmin () {
        document.querySelector('.BtnDeleteChat').addEventListener('click', () => {
            console.log(document.querySelector('.BtnDeleteChat'))

            console.log('click on delete chat')

            fetch(`/delete_chat/${document.querySelector('.IdChat').textContent}/${document.querySelector('.IdChat').textContent}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors",
                method: 'DELETE'
            })
                .then((res) => console.log(res))
                .then(() => window.location.reload())
        })
    }

    constructor() {
        this.BtnDeleteChatAdmin()
    }
}