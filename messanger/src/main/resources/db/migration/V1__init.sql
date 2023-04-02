create table public.users
(
    id serial primary key,
    username text not null unique,
    password_hash text not null,
    image text default '../image/settings/icon_profile.png'::text
);

create table public.chat
(
    id serial primary key,
    name text,
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

create table public.role
(
    id serial primary key,
    name text
);

create table public.userchat
(
    user_id integer references public.users,
    chat_id integer references public.chat,
    role_id integer not null references public.role
);