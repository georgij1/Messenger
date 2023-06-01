class ClickBtnDeleteAdminPanelStart {
    btn_delete () {
        document.querySelector('.WindowEditListUser').classList.add('block')
        document.querySelector('.FlexGroup').classList.remove('flex')
        document.querySelector('.ListMessage').classList.remove('flex')
        document.querySelector('.ListMessage').classList.add('none')
        document.querySelector('.height').classList.add('none')
        document.querySelector('.tools').classList.add('none')
        document.querySelector('.close_window_5').classList.add('block')
    }

    constructor() {
        this.btn_delete()
    }
}