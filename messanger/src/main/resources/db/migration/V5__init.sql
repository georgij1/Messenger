create table mycontacts
(
    id serial primary key,
    username text unique,
    image text
);

alter table mycontacts owner to georgii_1;