class LoadingContent1 {
    method_load_content () {
        document.addEventListener("DOMContentLoaded", () => {
            console.log('dom content is ready')
            document.querySelector('.body_load').classList.remove('block')
            document.querySelector('.content_not_for_loading').classList.remove('none')
        });

        function work () {
            console.log('document is loaded')
            document.querySelector('.body_load').classList.remove('block')
            document.querySelector('.content_not_for_loading').classList.remove('none')
        }

        if (document.readyState === 'loading') {
            document.querySelector('.body_load').classList.add('block')
            document.querySelector('.content_not_for_loading').classList.add('none')
        }

        else {
            // DOM готов!
            work();
        }
    }

    constructor() {
        this.method_load_content()
    }
}

new LoadingContent1()