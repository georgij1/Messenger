create table public.mycontacts
(
    id serial primary key,
    username text unique,
    image text
);

create table public.ImageMessage
(
    id serial primary key,
    text text,
    sender_id integer not null references public.users,
    chat_id integer not null references public.chat,
    time_stamp text
);

create table public.comand_dev
(
    id serial primary key,
    name text default 'Имя не задано',
    about_me text default 'Информации о себе нет',
    link_portfolio text default 'Ссылки на портфолио нет'
);