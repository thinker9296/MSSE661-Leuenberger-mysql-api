const controllers = require('../controllers/names.controller');
const express = require('express');

const namesRoutes = express.Router();
/**
 * Express routes for Names.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all names. Evaluates to `/names/`.
 */
namesRoutes.get('/', controllers.getAllNames).post('/', controllers.createName);

/**
 * Routes for a name by id. Evalutes to `/names/:namesId`.
 */
namesRoutes
  .get('/:nameId', controllers.getName) 
  .put('/:nameId', controllers.updateName)
  .delete('/:nameId', controllers.deleteName);

module.exports = namesRoutes;