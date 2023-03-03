create table public.users
(
    id            serial,
    username      text not null unique,
    password_hash text not null,
    number_phone  text not null
        unique,
    email         text not null,
    image_profile text not null
);

create table public.message
(
    id serial,
    username text,
    id_message text
)