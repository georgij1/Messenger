create table public.mycontacts
(
    id serial primary key,
    username text unique,
    image text
);