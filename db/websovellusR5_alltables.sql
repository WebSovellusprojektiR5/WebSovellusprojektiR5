CREATE TABLE item(  
    iditem SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    thumbnail_url VARCHAR(255),
    price NUMERIC,
    idrestaurant INT,
    iditemcategory INT,
    active BOOLEAN
);
CREATE TABLE itemcategory(  
    iditemcategory SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    thumbnail_url VARCHAR(255)
);
CREATE TABLE orders(  
    idorder SERIAL NOT NULL PRIMARY KEY,
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    ordered_time TIME,
    completed_time TIME,
    idperson INT,
    idrestaurant INT
);
CREATE TABLE order_has_items(  
    id SERIAL NOT NULL PRIMARY KEY,
    quantity INT,
    iditem INT,
    idorder INT
);
CREATE TABLE restaurant(  
    idrestaurant SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    thumbnail_url VARCHAR(255),
    picture_url VARCHAR(255),
    price_level INT,
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(255),
    phone VARCHAR(255),
    owner_idperson INT,
    idrestauranttype INT,
    active BOOLEAN
);
CREATE TABLE restauranttype(  
    idrestauranttype SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE person(  
    idperson SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(255),
    phone VARCHAR(255),
    username VARCHAR(255),
    pword VARCHAR(255),
    idpersonrole INT,
    active BOOLEAN
);
CREATE TABLE personrole(  
    idpersonrole SERIAL NOT NULL PRIMARY KEY,
    role VARCHAR(255)
);
COMMENT ON TABLE table_name IS 'table_comment';
COMMENT ON COLUMN table_name.content IS 'content';