class DeleteUser {
    method_delete_user () {
        document.querySelector('.DeleteUser').addEventListener('click', () => {
            console.log(document.querySelector('.EditListUser'))

            new ClickBtnDeleteAdminPanelStart()

            document.querySelector('.close_window_5').addEventListener('click', () => {
                new ClickOnClose__window_5()
            })

            let chat_name = document.querySelector('.border_name_chat').textContent

            fetch(`/Find/${chat_name}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors",
                method: 'POST'
            })
                .then(response => response.json())
                .then((data) => {data.forEach(item => {
                    console.log("DataLength - " + data.length)

                    if (data.length === null) {
                        document.querySelector('.ListUsersEdit').innerHTML += `
                                <p>Пользователей нет</p>
                            `
                    }

                    else if (item.name !== document.querySelector('.UserChatName').textContent) {
                        document.querySelector('.ListUsersEdit').innerHTML += `
                                <div class="Username">
                                    <div class="user" id="user">
                                        <div class="id">${item.id}</div>
                                        <div class="user_image" style="background: url(${item.image_user}) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>${item.image}</p></div>
                                        <div class="name">${item.name}</div>
                                    </div>
                            
                                    <div class="DeleteBtn">Удалить</div>
                                </div>
                            `
                    }

                    let DeleteBtn = document.querySelectorAll('.DeleteBtn')
                    for (let DeleteBtnItter of DeleteBtn) {
                        DeleteBtnItter.addEventListener('click', () => {
                            let Username = document.querySelectorAll('.Username')
                            for (let UsernameItter of Username) {
                                UsernameItter.addEventListener('click', (event) => {
                                    fetch(`/DeleteUser/${event.currentTarget.children[0].children[0].textContent}`, {
                                        headers: new Headers({
                                            'Content-Type': 'application/json'
                                        }),
                                        mode: "cors",
                                        method: 'DELETE'
                                    })
                                        .then(() => alert('Пользователь удалён из чата'))
                                        .then(() => window.location.reload())
                                })
                            }
                        })
                    }
                })})
        })
    }

    constructor() {
        this.method_delete_user()
    }
}