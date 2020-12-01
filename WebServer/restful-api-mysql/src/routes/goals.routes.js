const express = require('express');
const {
  getAllGoals,
  createGoal,
  getGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goals.controller');
const canAccess = require('../middleware/auth.middleware');

const goalsRoutes = express.Router();
/**
 * Express routes for Goals.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all goals. Evaluates to `/goals/`.
 */
goalsRoutes.get('/', canAccess, getAllGoals).post('/', canAccess, createGoal);

/**
 * Routes for a goal by id. Evalutes to `/goals/:goalId`.
 */
goalsRoutes
  .get('/:goalId', canAccess, getGoal) // GET http://locahost:3000/goals/1
  .put('/:goalId', canAccess, updateGoal)
  .delete('/:goalId', canAccess, deleteGoal);

module.exports = goalsRoutes;
