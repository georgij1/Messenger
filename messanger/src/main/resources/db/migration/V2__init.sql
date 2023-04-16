create table mycontacts
(
    id serial primary key,
    username text unique,
    image text
);

create table image_message
(
    id   text,
    name text,
    data text,
    type text,
    time_stamp_short text,
    time_stamp_long text
);

create table comand_dev
(
    id serial primary key,
    name text default 'Имя не задано',
    about_me text default 'Информации о себе нет',
    link_portfolio text default 'Ссылки на портфолио нет'
);

create table send_access_to_chat_post
(
    id serial not null primary key,
    usernamefromsent text,
    chat_name text,
    usernametosent text,
    access boolean,
    order_status boolean default true,
    cancel boolean default false
);