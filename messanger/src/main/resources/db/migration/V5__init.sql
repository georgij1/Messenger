create table mycontacts
(
    id serial primary key,
    username text unique,
    image text
);