-- create a database named 'WEBHIST'
CREATE DATABASE WEBHIST;
-- use the database
USE WEBHIST;
-- create a table in this database named 'URLS2'
CREATE TABLE URLS2 (
  -- the first column will be the auto_incremented id
  -- an integer no longer than 10 characters
  idUrl INT(10) NOT NULL auto_increment,
  -- the url column will be a variable character up to 100 characters
  url VARCHAR(100),
  -- this text is of sufficient length for most html files
  html MEDIUMTEXT,
  -- utilize the idUrl as the primary key for lookup
  PRIMARY KEY(idUrl)
);
