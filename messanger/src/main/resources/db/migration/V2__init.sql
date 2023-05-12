create table comand_dev
(
    id serial primary key,
    name text default 'Имя не задано',
    about_me text default 'Информации о себе нет',
    link_portfolio text default 'Ссылки на портфолио нет'
);