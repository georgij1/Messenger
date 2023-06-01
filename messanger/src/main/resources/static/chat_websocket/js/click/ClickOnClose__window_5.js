class ClickOnClose__window_5 {
    close_window_5() {
        document.querySelector('.WindowEditListUser').classList.remove('block')
        document.querySelector('.FlexGroup').classList.add('flex')
        document.querySelector('.ListMessage').classList.add('flex')
        document.querySelector('.ListMessage').classList.remove('none')
        document.querySelector('.height').classList.remove('none')
        document.querySelector('.tools').classList.remove('none')
        document.querySelector('.close_window_5').classList.remove('block')
    }

    constructor() {
        this.close_window_5()
    }
}