create table public.users
(
    id            serial,
    username      text not null unique,
    password_hash text not null,
    number_phone  text not null,
    email         text not null,
    image         text default '../image/settings/icon_profile.png'::text
);

create table public.message
(
    message text not null,
    author  text,
    id      serial
);