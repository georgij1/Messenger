let close_window_2 = document.querySelector('.close_window_2')
close_window_2.addEventListener('click', () => {
    window.history.go(-1)
})

let IdUser = document.querySelector('.IdUser')
fetch('/image_profile',{
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => console.log(data.forEach((item) => {
        IdUser.innerText=`${item.id}`
    })));