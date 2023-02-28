let return_back = document.querySelector('.return_back')

return_back.addEventListener('click', () => {
    window.history.go(-1)
    let history = window.history.go(-1)

    if (history === undefined) {
        alert("Прошлой страницы нет")
    }
})

console.log(document.referrer)