--liquibase formatted sql

--changeset application:1
CREATE TABLE inventory (
      id uuid NOT NULL,
      book_id uuid NULL,
      user_id uuid NULL,
      loan_date timestamp without time zone NULL,
      CONSTRAINT borrowed_book_pkey PRIMARY KEY (id)
);
ALTER TABLE inventory ADD CONSTRAINT book_id_key FOREIGN KEY (book_id) REFERENCES book(id);
ALTER TABLE inventory ADD CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES app_user(id);
