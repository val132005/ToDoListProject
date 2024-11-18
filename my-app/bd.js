/* -- Eliminar tablas que dependen de los tipos ENUM
DROP TABLE IF EXISTS photoGallery CASCADE;
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS toDoList CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS photo CASCADE;

-- Eliminar tipos ENUM
DROP TYPE IF EXISTS state_item CASCADE;
DROP TYPE IF EXISTS state_user CASCADE;
DROP TYPE IF EXISTS priority_item CASCADE;

-- Crear tipos ENUM
CREATE TYPE state_item AS ENUM ('undone', 'done', 'in_process');
CREATE TYPE state_user AS ENUM ('active', 'inactive');
CREATE TYPE priority_item AS ENUM ('high', 'medium', 'low');

-- Crear tablas
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    name_user TEXT NOT NULL,
    document_user BIGINT UNIQUE NOT NULL,
    state_user state_user NOT NULL,
    password_user TEXT NOT NULL
);

CREATE TABLE photo (
    id_photo SERIAL PRIMARY KEY,
    content_photo TEXT UNIQUE NOT NULL
);

CREATE TABLE toDoList (
    id_todolist SERIAL PRIMARY KEY,
    name_todolist TEXT NOT NULL,
    date_creation_todolist DATE NOT NULL,
    date_last_update_todolist DATE
);

CREATE TABLE item (
    id_item SERIAL PRIMARY KEY,
    name_item TEXT NOT NULL,
    description_item TEXT NOT NULL,
    state_item state_item NOT NULL,
    priority_item priority_item NOT NULL,
    id_todolist INT NOT NULL,
    CONSTRAINT fk_todolist_items FOREIGN KEY (id_todolist) REFERENCES toDoList(id_todolist)
);

CREATE TABLE photoGallery (
    id_photogallery SERIAL PRIMARY KEY,
    name_photogallery TEXT NOT NULL,
    id_user INT NOT NULL,
    id_photo INT NOT NULL,
    CONSTRAINT fk_user_photogallery FOREIGN KEY (id_user) REFERENCES users(id_user),
    CONSTRAINT fk_photo_photogallery FOREIGN KEY (id_photo) REFERENCES photo(id_photo)
);
*/