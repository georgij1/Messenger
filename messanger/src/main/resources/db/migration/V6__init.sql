create table users
(
    id serial primary key,
    username text not null unique,
    password_hash text not null,
    image text default '../image/settings/icon_profile.png',
    status text default 'Не в сети'
);

insert into users
(
    username,
    password_hash
) values (
    'i21s597',
    '$2a$10$XC7Kvj19UbYo7NTnKtJWCuGqD.ZV/U/H/jbKrdfLZ4WO3XDh8kIcK'
);

insert into users
(
    username,
    password_hash
) values (
    'i21s598',
    '$2a$10$XC7Kvj19UbYo7NTnKtJWCuGqD.ZV/U/H/jbKrdfLZ4WO3XDh8kIcK'
);

insert into users
(
    username,
    password_hash
) VALUES (
    'Admin',
    '$2a$10$XhZEKW4uQbDAA6iMW5a8i.ftC8Xkg1mgM9c1lFsUswTaHeBbko1jW'
);