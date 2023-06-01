let close_window = document.querySelector('.close_window')
let UserName = document.querySelector('.UserName').textContent

close_window.addEventListener('click', () => {
    return history.back()
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

        if (item.id_image === 'DefaultAva') {
            ImageUser.innerHTML+=`<img src="/image/settings/icon_profile.png" alt="">`
        }

        else {
            ImageUser.innerHTML+=`<img src="/AvatarImage/${document.querySelector('.UserName').textContent}/${item.id_image}" alt="">`
        }
    })))