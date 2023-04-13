create table public.users
(
    id serial primary key,
    username text not null unique,
    password_hash text not null,
    image text default '../image/settings/icon_profile.png'
);

create table public.chat
(
    id serial primary key,
    name text unique,
    desc_chat text default 'Описания нет',
    type text,
    image_chat text default '../image/settings/icon_profile.png',
    owner text not null
);

create table public.message
(
    id serial primary key,
    text text,
    sender_id integer not null references public.users,
    chat_id integer not null references public.chat,
    time_stamp text
);

create table public.users_chat
(
    id integer primary key,
    name text,
    chat_nane text,
    image_user text default '../image/settings/icon_profile.png'
);