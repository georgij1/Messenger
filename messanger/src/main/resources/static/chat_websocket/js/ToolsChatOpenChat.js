class AdminPanel {
    VisualStartAdminPanel () {
        if (document.querySelector('.UserChatName').textContent === document.querySelector('.username').textContent) {
            new InnerHtmlAdminPanel()

            new BtnAdminEditNameChat()

            new EditDescChat()

            new BtnDeleteChat()

            new AddUser()

            new DeleteUser()
        }
    }

    constructor() {
        this.VisualStartAdminPanel()
    }
}