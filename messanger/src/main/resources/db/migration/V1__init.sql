create table public.users
(
    id            serial primary key,
    username      text not null unique,
    password_hash text not null,
    image         text default '../image/settings/icon_profile.png'::text
);

create table public.chat
(
    id   serial primary key,
    name text not null
);

create table public.message
(
    id         serial primary key,
    text       text,
    sender_id  integer not null references public.users (id),
    chat_id    integer not null references public.chat (id),
    time_stamp timestamp default NOW()
);

-- create table public.users
-- (
--     id serial primary key,
--     username text not null unique,
--     password_hash text not null,
--     image text default '../image/settings/icon_profile.png'::text
-- );

create table public.role
(
    id   serial primary key,
    name text
);

create table public.userchat
(
    user_id integer references public.users (id),
    chat_id integer references public.chat (id),
    role_id integer not null references public.role (id)
);