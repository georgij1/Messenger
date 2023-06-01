class ClickOnClose__window_4 {
    window_4 () {
        document.querySelector('.WindowAddUsers').classList.remove('block')
        document.querySelector('.FlexGroup').classList.add('flex')
        document.querySelector('.ListMessage').classList.add('flex')
        document.querySelector('.ListMessage').classList.remove('none')
        document.querySelector('.height').classList.remove('none')
        document.querySelector('.tools').classList.remove('none')
        document.querySelector('.close_window_4').classList.remove('block')
    }

    constructor() {
        this.window_4()
    }
}