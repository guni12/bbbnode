DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS zones;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
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


CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY,
    sensorid VARCHAR(50) NOT NULL,
    zone VARCHAR(30) NOT NULL,
    gpio INTEGER,
    away INTEGER,
    dsm INTEGER,
    tempis REAL,
    isoff INTEGER,
    ison INTEGER,
    max INTEGER,
    min INTEGER,
    should INTEGER,
    name VARCHAR(50),
    measured VARCHAR(50)
);

INSERT INTO settings(area,currency,percent,dsmon,percenton) VALUES('SE1', 'SEK', 2, 0, 1);
