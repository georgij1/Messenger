create table users_chat
(
    id serial primary key,
    name text,
    chat_nane text,
    image_user text default '../image/settings/icon_profile.png'
);

insert into users_chat(
    name,
    chat_nane
) VALUES (
    'i21s598',
    'Команда'
);