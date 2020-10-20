create table users
(
    id bigint auto_increment,
    constraint users_pk
        primary key (id),
    first_name TEXT not null,
    last_name TEXT not null,
    age int null,
    email TEXT not null,
    username TEXT not null,
    password TEXT not null

);
