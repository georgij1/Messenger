create table public.mycontacts
(
    id serial primary key,
    username text unique,
    image text
);

create table public.image_message
(
    id serial primary key,
    name text,
    data text,
    type text
);

create table public.comand_dev
(
    id serial primary key,
    name text default 'Имя не задано',
    about_me text default 'Информации о себе нет',
    link_portfolio text default 'Ссылки на портфолио нет'
);