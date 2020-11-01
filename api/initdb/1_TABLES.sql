create table users
(
    id         bigint auto_increment,
    constraint users_pk
        primary key (id),
    first_name TEXT   not null,
    last_name  TEXT   not null,
    age        int    null,
    email      TEXT   not null,
    hash       BLOB   not null,
    salt       BLOB   not null,
    id_cv      bigint,
    id_image   bigint null,
    id_custom  bigint null
);

create table cvs
(
    id         bigint auto_increment,
    constraint cvs_pk
        primary key (id),
    user       TEXT null,
    education  TEXT null,
    experience TEXT null,
    skills     TEXT null,
    languages  TEXT null,
    activities TEXT null,
    git        TEXT null,
    linkedin   TEXT null,
    fb         TEXT null
);

create table image_model
(
    id   bigint auto_increment,
    constraint img_pk
        primary key (id),
    name TEXT     null,
    type TEXT     null,
    pic  LONGBLOB null
);

create table custom
(
    id     bigint auto_increment,
    constraint custom_pk
        primary key (id),
    banner TEXT null,
    titles TEXT null
)

