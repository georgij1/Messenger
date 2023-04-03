let btn_return_back = document.querySelectorAll('.btn_return_back')

for (let btn_return_back_itter of btn_return_back) {
    btn_return_back_itter.addEventListener('click', () => {
        window.history.go(-1)
    })
}