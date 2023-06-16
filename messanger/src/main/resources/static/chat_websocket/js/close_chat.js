document.querySelector('.close_window_2').addEventListener('click', () => {
    window.open('/websocket_chat', '_self')
})

let IdUser = document.querySelector('.IdUser')
fetch('/image_profile',{
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => (data.forEach((item) => {
        IdUser.innerText=`${item.id}`
    })));