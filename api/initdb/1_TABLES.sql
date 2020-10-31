create table users
(
    id bigint auto_increment,
    constraint users_pk
        primary key (id),
    first_name TEXT not null,
    last_name TEXT not null,
    age int null,
    email TEXT not null,
    password TEXT not null,
    id_cv bigint
);

create table cvs
(
    id bigint auto_increment,
    constraint cvs_pk
        primary key (id),
    user TEXT null,
    education TEXT null,
    experience TEXT null,
    skills TEXT null,
    languages TEXT null,
    activities TEXT null,
    git TEXT null,
    linkedin TEXT null,
    fb TEXT null
);

create table image_model
(
    id bigint auto_increment,
    constraint cvs_pk
        primary key (id),
    name TEXT null,
    type TEXT null,
    pic LONGBLOB null
)

