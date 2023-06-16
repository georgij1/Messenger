create table users
(
    id serial primary key,
    username text not null unique,
    password_hash text not null,
    status text default 'Не в сети',
    id_image text,
    data integer,
    type text,
    name_image text
);

insert into users
(
    username,
    password_hash,
    id_image,
    data,
    type,
    name_image
) values (
    'i21s597',
    '$2a$10$XC7Kvj19UbYo7NTnKtJWCuGqD.ZV/U/H/jbKrdfLZ4WO3XDh8kIcK',
    'DefaultAva',
    0,
    'image/default',
    'image_default.png'
);

insert into users
(
    username,
    password_hash,
    id_image,
    data,
    type,
    name_image
) values (
    'i21s598',
    '$2a$10$XC7Kvj19UbYo7NTnKtJWCuGqD.ZV/U/H/jbKrdfLZ4WO3XDh8kIcK',
    'DefaultAva',
    0,
    'image/default',
    'image_default.png'
);

insert into users
(
    username,
    password_hash,
    id_image,
    data,
    type,
    name_image
) VALUES (
    'Admin',
    '$2a$10$XhZEKW4uQbDAA6iMW5a8i.ftC8Xkg1mgM9c1lFsUswTaHeBbko1jW',
    'DefaultAva',
    0,
    'image/default',
    'image_default.png'
);