fetch('http://localhost:8080/image_profile',{
    headers: new Headers({
    'Content-Type': 'application/json'
}),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => (data.forEach((item) => {
        let image_profile = document.querySelector('.image_profile')
        image_profile.innerHTML=`<div style="background: url(${item.image}) no-repeat; background-size: 100%; height: 100%; width: 100%; border-radius: 50px;">`
    })));

let btn_up = document.querySelector('.btn_up')
let delete_account = document.querySelector('.delete_account')
btn_up.addEventListener('click', () => {
    btn_up.classList.toggle('round')
    delete_account.classList.toggle('block')
})

let btn_delete_account = document.querySelector('.btn_delete_account')
let username_get = document.querySelector('.username')
btn_delete_account.addEventListener('click', () => {
    fetch('/delete_user', {})
        .then(data => {console.log(data.json())})
})