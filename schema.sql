CREATE DATABASE axess;
USE axess;

CREATE TABLE Admins (
    adminID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    image_link VARCHAR(255)
);

CREATE TABLE Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    workingArea VARCHAR(255),
    areasAccessible VARCHAR(255)
);

CREATE TABLE AccountRequests (
    requestID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR (255),
    workingArea VARCHAR(255),
    areasRequested VARCHAR(255)
);

CREATE TABLE BuildingAreas (
    areaID INT AUTO_INCREMENT PRIMARY KEY,
    areaName VARCHAR(255)
);

CREATE TABLE AccessLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    areaID INT,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (areaID) REFERENCES BuildingAreas(areaID)
);

INSERT INTO BuildingAreas (areaName)
VALUES ('serverRoom');

INSERT INTO BuildingAreas (areaName)
VALUES ('mainDoor');

INSERT INTO BuildingAreas (areaName)
VALUES ('devRoom');

INSERT INTO BuildingAreas (areaName)
VALUES ('switchcare');

INSERT INTO BuildingAreas (areaName)
VALUES ('genPop');

INSERT INTO AccountRequests (name, surname, email, password, workingArea, areasRequested)
VALUES ('John', 'Doe', 'johndoe@example.com', SUBSTRING(MD5(RAND()) FROM 1 FOR 8), 'devRoom', 'mainDoor, devRoom, serverRoom');

INSERT INTO AccountRequests (name, surname, email, password, workingArea, areasRequested)
VALUES ('Jane', 'Smith', 'janesmith@example.com', SUBSTRING(MD5(RAND()) FROM 1 FOR 8), 'switchcare', 'mainDoor, switchcare, serverRoom');

INSERT INTO AccountRequests (name, surname, email, password, workingArea, areasRequested)
VALUES ('David', 'Johnson', 'davidjohnson@example.com', SUBSTRING(MD5(RAND()) FROM 1 FOR 8), 'genpop', 'mainDoor, genpop');

INSERT INTO AccountRequests (name, surname, email, password, workingArea, areasRequested)
VALUES ('Emily', 'Davis', 'emilydavis@example.com', SUBSTRING(MD5(RAND()) FROM 1 FOR 8), 'switchcare', 'mainDoor, switchcare');

INSERT INTO AccountRequests (name, surname, email, password, workingArea, areasRequested)
VALUES ('Michael', 'Wilson', 'michaelwilson@example.com', SUBSTRING(MD5(RAND()) FROM 1 FOR 8), 'devRoom', 'mainDoor, devRoom, serverRoom');