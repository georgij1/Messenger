create table comand_dev
(
    id serial primary key,
    name text default 'Имя не задано',
    about_me text default 'Информации о себе нет',
    link_portfolio text default 'Ссылки на портфолио нет'
);

insert into comand_dev(
    name,
    about_me,
    link_portfolio
) VALUES (
    'i21s597',
    'Информация о пользователе',
    'https://work.students.it-college.ru/repo/i21s597/WEB/index.html'
);