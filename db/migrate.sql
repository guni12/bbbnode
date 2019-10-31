DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS sensors;
DROP TABLE IF EXISTS gpios;
DROP TABLE IF EXISTS rooms;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS sensors (
    id INTEGER PRIMARY KEY,
    sensor VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50),
    tempis REAL,
    measured VARCHAR(50),
    room VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS gpios (
    id INTEGER PRIMARY KEY,
    gpio INTEGER NOT NULL UNIQUE,
    status INTEGER NOT NULL,
    mode VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY,
    area VARCHAR(20) NOT NULL,
    currency VARCHAR(20)NOT NULL,
    dsmon INTEGER NOT NULL,
    percenton INTEGER NOT NULL,
    percent INTEGER NOT NULL,
    awayfrom DATETIME,
    awayto DATETIME
);


CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY,
    sensorid VARCHAR(50) UNIQUE,
    gpio INTEGER UNIQUE,
    away INTEGER,
    dsm INTEGER,
    isoff INTEGER,
    ison INTEGER,
    max INTEGER,
    min INTEGER,
    should INTEGER,
    roomname VARCHAR(50),
    mainroom INTEGER
);

INSERT INTO settings(area,currency,percent,dsmon,percenton) VALUES('SE1', 'SEK', 2, 0, 1);
