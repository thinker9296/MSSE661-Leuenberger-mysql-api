const mysql = require('mysql');
const { CREATE_USERS_TABLE } = require('./queries/user.queries');
const { CREATE_GOALS_TABLE } = require('./queries/goals.queries');
const query = require('./utils/query');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'willow1';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'goals';

// Create the connection with required details
const connection = async () =>
  new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host,
      user,
      password,
      database,
    });
// Connect to the database.
    con.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
    });

    resolve(con);
  });

// Create the connection with required details
(async () => {
  const _con = await connection().catch((err) => {
    throw err;
  });

  const userTableCreated = await query(_con, CREATE_USERS_TABLE).catch(
    (err) => {
      console.log(err);
    }
  );

  const goalsTableCreated = await query(_con, CREATE_GOALS_TABLE).catch(
    (err) => {
      console.log(err);
    }
  );

  if (!!userTableCreated && !!goalsTableCreated) {
    console.log('Tables Created!');
  }
})();

module.exports = connection;
