const pagination = document.querySelector('.pagination');
const pages = pagination.querySelectorAll('.page');
const prev = pagination.querySelector('.prev');
const next = pagination.querySelector('.next');
let currentPage = parseInt(pagination.querySelector('.active').textContent);

prev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});

next.addEventListener('click', () => {
    if (currentPage < pages.length) {
        currentPage++;
        fetchData(currentPage);
    }
});

pages.forEach(page => {
    page.addEventListener('click', () => {
        currentPage = parseInt(page.textContent);
        fetchData(currentPage);
    });
});

function fetchData(page) {
    fetch(`/users?page=${page}`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const html = parser.parseFromString(data, 'text/html');
            const table = html.querySelector('table');
            const newPagination = html.querySelector('.pagination');
            pagination.replaceWith(newPagination);
            document.querySelector('tbody').replaceWith(table.querySelector('tbody'));
            pagination = newPagination;
            pages = pagination.querySelectorAll('.page');
            prev = pagination.querySelector('.prev');
            next = pagination.querySelector('.next');
        })
        .catch(error => console.log(error));
}
