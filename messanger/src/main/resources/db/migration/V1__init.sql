create table chat
(
    id serial primary key,
    name text unique,
    desc_chat text default 'Описания нет',
    type text,
    image_chat text default '../image/settings/icon_profile.png',
    owner text
);

insert into chat (
    name,
    desc_chat,
    type,
    owner
) VALUES (
    'Команда',
    'Описание команды',
    'group_chat',
    'Admin'
);