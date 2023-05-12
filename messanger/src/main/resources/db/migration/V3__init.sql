create table message
(
    id_message serial primary key,
    text text,
    sender_id integer,
    chat_id text,
    time_stamp_short text,
    time_stamp_long text,
    id_image text,
    image_name text,
    data integer,
    type text,
    read boolean default false,
    get boolean default true
);

alter table message owner to georgii_1;