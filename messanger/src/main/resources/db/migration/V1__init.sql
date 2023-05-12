create table chat
(
    id serial primary key,
    name text unique,
    desc_chat text default 'Описания нет',
    type text,
    image_chat text default '../image/settings/icon_profile.png',
    owner text
);