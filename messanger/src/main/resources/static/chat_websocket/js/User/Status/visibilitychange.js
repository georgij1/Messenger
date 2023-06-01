class visibilitychangeMethod {
    visibilitychange_method () {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden){
                console.log('Вкладка не активна');
                new Offline()
            }

            else {
                console.log('Вкладка активна');
                new Online()
            }
        })
    }

    constructor() {
        this.visibilitychange_method()
    }
}

new visibilitychangeMethod()