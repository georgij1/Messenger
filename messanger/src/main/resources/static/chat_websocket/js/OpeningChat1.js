document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        console.log('Вкладка не активна');
        Offline.get_offline_user()
    }

    else {
        console.log('Вкладка активна');
        Online.get_online_user()
    }
});

window.addEventListener('load', () => {
    if (navigator.onLine) {
        console.log('В сети')
        Online.get_online_user()
    }

    else {
        console.log('Не в сети')
        Offline.get_offline_user()
    }
}, false);

window.addEventListener('online', () => {
    console.log('Я вернулся');
    Online.get_online_user()
}, false);

window.addEventListener('offline', () => {
    console.log('Не в сети');
    Offline.get_offline_user()
}, false);