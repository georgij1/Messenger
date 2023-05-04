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
        ImageUser.innerHTML+=`<img src="/${item.image}" alt="">`
    })))