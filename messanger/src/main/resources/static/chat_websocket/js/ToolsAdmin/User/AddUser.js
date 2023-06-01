class AddUser {
    method_add_user () {
        document.querySelector('.AddUser').addEventListener('click', () => {
            console.log(document.querySelector('.AddUser'))

            new ClickBtnAddUser()

            document.querySelector('.close_window_4').addEventListener('click', () => {
                new ClickOnClose__window_4()
            })

            fetch('/all_users', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors"
            })
                .then(response => response.json())
                .then((data) => {
                    data.forEach(item => {
                        console.log(item)

                        if (item.username !== document.querySelector('.username').textContent) {
                            if (item.id_image === 'DefaultAva') {
                                console.log('if is running')

                                document.querySelector('.ListUsersAddNewUserChat').innerHTML += `
                                        <div class="user">
                                            <div class="user_image" style="background: url(/image/settings/icon_profile.png) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/image/settings/icon_profile.png</p></div>
                                            <div class="name">${item.username}</div>
                                        </div>
                                    `
                            }

                            else {
                                console.log('else')

                                document.querySelector('.ListUsersAddNewUserChat').innerHTML += `
                                        <div class="user">
                                            <div class="user_image" style="background: url('/AvatarImage/${item.username}/${item.id_image}') no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/AvatarImage/${item.username}/${item.id_image}</p></div>
                                            <div class="name">${item.username}</div>
                                        </div>
                                    `
                            }

                            for (let UserItter of document.querySelectorAll('.user')) {
                                UserItter.addEventListener('click', (event) => {
                                    console.log('click on - user - ', UserItter)
                                    console.log(event.currentTarget)
                                    console.log(event.currentTarget.querySelector('.name'))

                                    const user = event.currentTarget.querySelector('.name').textContent;
                                    const image = event.currentTarget.querySelector('p').textContent

                                    let is_exists = -1;

                                    for (let i = 0; i < users.length; ++i) {
                                        if (users[i].user === user) {
                                            is_exists = i;
                                            break;
                                        }
                                    }

                                    (is_exists === -1 ? users.push({user: user, image: image}) : users.splice(is_exists, 1))

                                    let AddSaveBtnUserChat = document.querySelector('.AddSaveBtnUserChat')

                                    UserItter.classList.toggle('tick')

                                    let FormData = {
                                        "chat_name": document.querySelector('.border_name_chat').textContent,
                                        "image_user": users.map(item => item.image),
                                        "name": users.map(item => item.user)
                                    }

                                    console.log(FormData)
                                    console.log(typeof FormData.name)
                                    console.log(typeof FormData.image_user)
                                    console.log(typeof FormData.chat_name)

                                    if (FormData.chat_name.length > 0) {
                                        AddSaveBtnUserChat.classList.add('block')
                                    }

                                    else {
                                        AddSaveBtnUserChat.classList.remove('block')
                                    }

                                    AddSaveBtnUserChat.addEventListener('click', () => {
                                        fetch('/AddUserChatAdmin', {
                                            headers: new Headers({
                                                'Content-Type': 'application/json'
                                            }),
                                            mode: "cors",
                                            method: "POST",
                                            body: JSON.stringify(FormData)
                                        })
                                            .then(res => res)
                                    })
                                })
                            }
                        }
                    })

                })
        })
    }

    constructor() {
        this.method_add_user()
    }
}