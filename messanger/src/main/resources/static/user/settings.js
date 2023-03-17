 let number_phone = document.querySelector('.number_phone')
 fetch('/phone_number', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => console.log(data.forEach((item) => {
        console.log(item.number_phone)
        number_phone.innerHTML=`<input type="text" class="number_phone" readonly value="${item.number_phone}">`
    })));


let points = document.querySelector('.points')
let menu = document.querySelector('.menu')
points.addEventListener('click', () => {
    menu.classList.add('visible')
})
let content = document.querySelector('.content')
content.addEventListener('click', () => {
    menu.classList.remove('visible')
})

let second_part_header = document.querySelector('.second_part_header')
second_part_header.addEventListener('click', () => {
    menu.classList.remove('visible')
})

fetch('/email', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => console.log(data.forEach((item) => {
        console.log(item.email)
        let email = document.querySelector('.email')
        email.innerHTML=`<input type="text" class="number_phone nickname" readonly value="${item.email}">`
    })));


fetch('http://localhost:8080/image_profile',{
    headers: new Headers({
    'Content-Type': 'application/json'
}),
    mode: "cors"
 })
    .then(response => response.json())
    .then((data) => console.log(data.forEach((item) => {
    console.log(item.image)
    let icon_profile = document.querySelector('.icon_profile')
    icon_profile.innerHTML=`<div style="
        background: url(${item.image}) no-repeat 10px;
        background-size: 71px;
        height: 60px;
        width: 70px;
        margin-left: -18px;
        box-shadow: 0 0 10px blue;
        padding: 10px;
        border-radius: 50px;
    ">`
 })));