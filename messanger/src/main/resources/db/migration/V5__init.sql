create table if not exists send_access_to_chat_post
(
    id serial primary key,
    usernamefromsent text,
    chat_name text,
    usernametosent text,
    access boolean,
    order_status boolean default true,
    cancel boolean default false,
    info_about_user text
);

insert into send_access_to_chat_post (
    usernamefromsent,
    chat_name,
    usernametosent,
    access,
    order_status,
    cancel
) values (
    'i21s598',
    'Команда',
    'i21s597',
    '1',
    '0',
    '0'
)