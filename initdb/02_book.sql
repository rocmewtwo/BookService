--liquibase formatted sql

--changeset application:1
CREATE TABLE book (
     id uuid NOT NULL,
     author varchar(255) NULL,
     image varchar(255) NULL,
     title varchar(255) NULL,
     CONSTRAINT book_pkey PRIMARY KEY (id)
);
