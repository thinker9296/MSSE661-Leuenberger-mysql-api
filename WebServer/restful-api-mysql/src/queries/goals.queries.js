/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 *
 * Create a table called `goals` (case-insensitive), with
 * - id as an integer/number that can't have null values, auto-increment it
 * - name with a max of 255 characters, cannot have null values
 * - created_date set to date and time created
 * - status with a max of 10 characters, has a default of 'pending'
 *
 * NOTE: order is important.
 * - columns can have multiple options attached (take `id` column for example)
 * - id is always first (helps with inserting)
 * - defaults always specifed last (helps with inserting)
 */
exports.CREATE_GOALS_TABLE = `CREATE TABLE IF NOT EXISTS goals(
  goal_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  goal_name varchar(255) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  status varchar(10) DEFAULT 'pending',
  PRIMARY KEY (goal_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

// Get every goal
exports.ALL_GOALS = (userId) => `SELECT * FROM goals WHERE user_id = ${userId}`;

// Get a single goal by id
exports.SINGLE_GOAL = (userId, goalId) =>
  `SELECT * FROM goals WHERE user_id = ${userId} AND goal_id = ${goalId}`;

/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
 *
 * Create a new goal in `goals` table where
 * - column names match the order the are in the table
 * - `?` allow us to use params in our controllers
 */
exports.INSERT_GOAL = (userId, goalName) =>
  `INSERT INTO goals (user_id, goal_name) VALUES (${userId}, ${goalName})`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
 *
 * NOTE: omitting `WHERE` will result in updating every existing entry.
 */
exports.UPDATE_GOAL = (userId, goalId, newValues) =>
  `UPDATE goals SET ${newValues} WHERE user_id = ${userId} AND goal_id = ${goalId}`;

// Delete a goal by id
exports.DELETE_GOAL = (userId, goalId) =>
  `DELETE FROM goals WHERE user_id = ${userId} AND goal_id = ${goalId}`;
