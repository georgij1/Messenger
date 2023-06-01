class InnerHtmlAdminPanel {
    StartAdminPanel () {
        document.querySelector('.AdminChangeChat_0').innerHTML+=`
                <div class="BtnEditNameChat">Изменить название чата</div>
                <div class="BtnEditDescChat">Изменить описание чата</div>
                <div class="BtnDeleteChat">Удалить чат</div>
            `

        document.querySelector('.AdminChangeChat_1').innerHTML+=`
                <div class="AddUser">Добавить участников</div>
                <div class="DeleteUser">Удалить участников</div>
            `
    }

    constructor() {
        this.StartAdminPanel()
    }
}