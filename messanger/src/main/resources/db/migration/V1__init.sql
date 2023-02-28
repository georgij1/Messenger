create table public.users
(
    id            serial,
    username      text not null,
    password_hash text not null,
    number_phone  text not null
        unique,
    email         text not null,
    image_profile text not null
);

alter table public.users
    owner to i21s597;

