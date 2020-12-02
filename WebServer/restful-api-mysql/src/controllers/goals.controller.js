const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_GOALS,
  SINGLE_GOAL,
  INSERT_GOAL,
  UPDATE_GOAL,
  DELETE_GOAL,
} = require('../queries/goals.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/goals
exports.getAllGoals = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all goals
  const goals = await query(con, ALL_GOALS(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!goals.length) {
    res.status(200).json({ msg: 'No goals available for this user.' });
  }
  res.json(goals);
};

// http://localhost:3000/goals/1
exports.getGoal = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all goal
  const goal = await query(
    con,
    SINGLE_GOAL(req.user.id, req.params.goalId)
  ).catch(serverError(res));

  if (!goal.length) {
    res.status(400).json({ msg: 'No goals available for this user.' });
  }
  res.json(goal);
};

// http://localhost:3000/goals
/**
 * POST request -
 * {
 *  name: 'A goal name'
 * }
 */
exports.createGoal = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add goal
    const goalName = mysql.escape(req.body.goal_name);
    const result = await query(con, INSERT_GOAL(user.id, goalName)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add goal: ${req.body.goal_name}` });
    }
    res.json({ msg: 'Added goal successfully!' });
  }
};

/**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "goal_name = \'Goal 1\', status = \'$500\', date = \'<today's_date>\'"
 */
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [goal_name, status].map()
    (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 goal name'
  );

  values.push(`created_date = NOW()`); // update current date and time
  values.join(', '); // make into a string
  return values;
};

// http://localhost:3000/goals/1
/**
 * PUT request -
 * {
 *  name: 'A goal name',
 *  state: 'completed'
 * }
 */
exports.updateGoal = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  // query update goal
  const result = await query(
    con,
    UPDATE_GOAL(req.user.id, req.params.goalId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update goal: '${req.body.goal_name}'` });
  }
  res.json(result);
};

// http://localhost:3000/goals/1
exports.deleteGoal = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete goal
  const result = await query(
    con,
    DELETE_GOAL(req.user.id, req.params.goalId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete goal at: ${req.params.goalId}` });
  }
  res.json({ msg: 'Deleted successfully.' });
};
