MySQL RESTful API


After you've cloned the project, you'll need to have a database created in mysql called names.

MySQL Setup and Installation


In order to run the the mysql server, I am assuming for this class purpose mysql and the needed server and packages are installed as I am running on Windows and other on Macs.



Schemas

My names table:


Tables follow syntax:
- CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
Create a table called `names` (case-insensitive), with
- id as an integer/number that can't have null values, auto-increment it
- firstname with a max of 25 characters, cannot have null values
- lastname with a max of 25 characters, cannot have null values
- created_date set to date and time created

NOTE: order is important.
- columns can have multiple options attached (take `id` column for example)
- id is always first (helps with inserting)
- defaults always specifed last (helps with inserting)

exports.CREATE_NAMES_TABLE = `CREATE TABLE IF NOT EXISTS names(
    id int NOT NULL AUTO_INCREMENT,
    firstname varchar(25) NOT NULL,
    lastname varchar(25) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id)
  )`;


My queries:

Get every name
exports.ALL_NAMES = `SELECT * FROM names`;
 
Get a single name by id
exports.SINGLE_NAMES = `SELECT * FROM names WHERE id = ?`;
  

Insert follows syntax:
- INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
   VALUES(<value1>, <value2>, <value3>, ...)
Create a new name in `names` table where
- column names match the order the are in the table
- `?` allow us to use params in our controllers

exports.INSERT_NAME = `INSERT INTO names (firstname, lastname) VALUES (?,?)`;
  

Update follows syntax:
- UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
NOTE: omitting `WHERE` will result in updating every existing entry.

exports.UPDATE_NAME = `UPDATE names SET firstname = ?, lastname = ? WHERE id = ?`;
  
Delete a name by id
exports.DELETE_NAME = `DELETE FROM names WHERE id = ?`;
