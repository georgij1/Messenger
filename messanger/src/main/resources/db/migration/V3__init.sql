create table if not exists message
(
    id_message serial primary key,
    text text,
    sender_id integer,
    chat_id text,
    time_stamp_short text,
    time_stamp_long text,
    id_image_message text,
    image_name text,
    data integer,
    type text,
    read boolean default false,
    get boolean default true
);

insert into message (
    text,
    sender_id,
    chat_id,
    time_stamp_short,
    time_stamp_long,
    id_image_message,
    image_name,
    data,
    type
) values (
    'Приветствуем в чате',
    1,
    '1',
    '00:00',
    '13.05.2023 00:00:00',
    'TextMessage',
    'TextMessage',
    0,
    'text'
);