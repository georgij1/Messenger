let ListDev = document.querySelector('.ListDev')
let SendOffer = document.querySelector('.SendOffer')

SendOffer.addEventListener('click', () => {
    let name = document.querySelector('.Name').value
    let about_me = document.querySelector('.AboutMe').value
    let LinkPortfolio = document.querySelector('.LinkPortfolio').value

    const formData = {
        "name": name,
        "about_me": about_me,
        "link_portfolio": LinkPortfolio
    }

    fetch('/CommandDev/listPost', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {console.log(formData)})
    .then(() => {window.location.reload()})
})

fetch('/CommandDev/listGet', {
    headers: {
        "Content-Type": "application/json"
    },
    mode: "cors"
})
    .then(res => res.json())
    .then(data => data.forEach(item => {
        console.log(item)
        ListDev.innerHTML+=`
            <div class="dev">
                <div class="NameDevItem">Id разработчика: ${item.name}</div>
                <div class="AboutDevItem">Информация о нём: ${item.about_me}</div>
                <div class="LinkPortfolioItem">Ссылка на портфолио: <div class="Link">${item.link_portfolio}</div></div>
            </div>
        `
        let Link = document.querySelector('.Link')
        Link.addEventListener('click', () => {
            window.open(`${Link.textContent}`)
        })
    }))

let ReturnBack = document.querySelector('.ReturnBack')

ReturnBack.addEventListener('click', () => {
    window.history.go(-1)
})

let btnAddDev = document.querySelector('.btnAddDev')
let WindowMain = document.querySelector('.WindowMain')
let WindowOpenAddDev = document.querySelector('.WindowOpenAddDev')
let BtnCloseWindow = document.querySelector('.BtnCloseWindow')

btnAddDev.addEventListener('click', () => {
    WindowMain.classList.add('none')
    WindowOpenAddDev.classList.add('block')
})

BtnCloseWindow.addEventListener('click', () => {
    WindowMain.classList.remove('none')
    WindowOpenAddDev.classList.remove('block')
})