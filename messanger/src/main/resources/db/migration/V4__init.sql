create table if not exists mycontacts
(
    id serial primary key,
    username text unique,
    image text
);

insert into mycontacts (
    username,
    image
) VALUES (
    'i21s598',
    '../image/settings/icon_profile.png'
)