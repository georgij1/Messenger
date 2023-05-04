let close_window = document.querySelector('.close_window')
let BtnEditUsername = document.querySelector('.BtnEditUsername')
let UserName = document.querySelector('.UserName').textContent
let ImageUser = document.querySelector('.ImageUser')
let BtnUpdateImage = document.querySelector('.BtnUpdateImage')
let GroupYorOwn = document.querySelector('.GroupYorOwn')
let DeleteAccount = document.querySelector('.DeleteAccount')
let LogoutAccount = document.querySelector('.LogoutAccount')
let window_edit_chat = document.querySelector('.window_edit_chat')
let close_window_1 = document.querySelector('.close_window_1')
let FormEditUserName = document.querySelector('.FormEditUserName')
close_window.addEventListener('click', () => {
    return history.back()
})
BtnEditUsername.addEventListener('click', () => {
    ImageUser.classList.add('none')
    BtnUpdateImage.classList.add('none')
    document.querySelector('.UserName').classList.add('none')
    BtnEditUsername.classList.add('none')
    GroupYorOwn.classList.add('none')
    DeleteAccount.classList.add('none')
    LogoutAccount.classList.add('none')
    close_window.classList.add('none')
    window_edit_chat.classList.add('block')
})
close_window_1.addEventListener('click', () => {
    ImageUser.classList.remove('none')
    BtnUpdateImage.classList.remove('none')
    document.querySelector('.UserName').classList.remove('none')
    BtnEditUsername.classList.remove('none')
    GroupYorOwn.classList.remove('none')
    DeleteAccount.classList.remove('none')
    LogoutAccount.classList.remove('none')
    close_window.classList.remove('none')
    window_edit_chat.classList.remove('block')
})

FormEditUserName.innerHTML=`
    <input class="InputUserName" type="text" value="${UserName}">
    <form action="/logout">
        <input class="BtnSaveNewName" type="submit">
    </form>
    <p>¬нимание после изменении имени войдите заново</p>
`
let BtnSaveNewName = document.querySelector('.BtnSaveNewName')
BtnSaveNewName.addEventListener('click', () => {
    let InputUserName = document.querySelector('.InputUserName')

    fetch(`/GetIdPerson/${UserName}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: "cors"
    })
        .then(response => response.json())
        .then((data) => (data.forEach((item) => {
            console.log(item)
            console.log(InputUserName.value)
            let ImageUser = document.querySelector('.ImageUser')
            ImageUser.innerHTML+=`<img src="${item.image}" alt="">`
            const FromData = {
                "NewUsername": InputUserName.value
            }
            fetch(`/EditPersonsById/${item.id}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors",
                method: 'POST',
                body: JSON.stringify(FromData)
            })
                .then(res => {
                    console.log(res)
                    window.location.reload()
                })
        })))
})

fetch(`/GetIdPerson/${UserName}`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => (data.forEach((item) => {
        let ImageUser = document.querySelector('.ImageUser')
        ImageUser.innerHTML+=`<img src="${item.image}" alt="">`
    })))

let DeleteAccount_1 = document.querySelectorAll('.DeleteAccount')

for (let btn_delete_Accounts of DeleteAccount_1) {
    btn_delete_Accounts.addEventListener('click', () => {
        fetch(`/user/id`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        })
            .then(response => response.json())
            .then((data) => (data.forEach((item) => {
                console.log(item.id)
                console.log(item.id)
                fetch(`/delete_user/${item.id}`, {
                    method: 'delete',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    mode: "cors"
                })
                    .catch(err => {console.log(err)})
                    .then(res => {
                        console.log(res)
                    })
            })))
    })
}