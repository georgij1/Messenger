create table if not exists users_chat
(
    id serial primary key,
    name text references users (username),
    chat_nane  text,
    image_user text default '../image/settings/icon_profile.png',
    status text default 'Не в сети'
);

insert into users_chat(
    name,
    chat_nane
) VALUES (
    'i21s598',
    'Команда'
);

insert into users_chat(
    name,
    chat_nane
) VALUES (
    'i21s598',
    'Команда'
);