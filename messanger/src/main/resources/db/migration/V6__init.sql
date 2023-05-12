create table send_access_to_chat_post
(
    id serial primary key,
    usernamefromsent text,
    chat_name text,
    usernametosent text,
    access boolean,
    order_status boolean default true,
    cancel boolean default false
);

alter table send_access_to_chat_post owner to georgii_1;