--liquibase formatted sql

--changeset application:1
CREATE TABLE app_user (
     id uuid NOT NULL,
     "password" varchar(255) NULL,
     "role" varchar(255) NULL,
     username varchar(255) NULL,
     CONSTRAINT app_user_pkey PRIMARY KEY (id)
);
