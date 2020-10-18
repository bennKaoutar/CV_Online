create table users
(
    id bigint auto_increment,
    constraint users_pk
        primary key (id),
    first_name TEXT not null,
    last_name TEXT not null,
    age int null
);

create table cvs
(
    id bigint auto_increment,
    constraint cvs_pk
        primary key (id),
    user TEXT not null,
    education TEXT not null,
    experience TEXT not null,
    skills TEXT not null,
    languages TEXT not null,
    activities TEXT not null,
    git TEXT null,
    linkedin TEXT null,
    fb TEXT null
);
