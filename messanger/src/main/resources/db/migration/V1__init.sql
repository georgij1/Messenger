create table users
(
    id serial primary key,
    username text not null unique,
    password_hash text not null,
    image text default '../image/settings/icon_profile.png'
);

create table chat
(
    id serial primary key,
    name text unique,
    desc_chat  text default 'Описания нет',
    type text,
    image_chat text default '../image/settings/icon_profile.png',
    owner text not null
);

create table message
(
    id serial primary key,
    text text,
    sender_id integer not null references users,
    chat_id integer not null references chat,
    time_stamp_short text,
    time_stamp_long  text
);

create table users_chat
(
    name       text,
    chat_nane text,
    image_user text default '../image/settings/icon_profile.png',
    id serial not null primary key
);