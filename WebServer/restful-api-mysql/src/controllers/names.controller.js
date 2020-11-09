const con = require('../db-config');
const queries = require('../queries/names.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports. getAllNames = function(req, res) {
  con.query(queries.ALL_NAMES, function(err, result, fields) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};


exports.getName = function(req, res) {
  con.query(queries.SINGLE_NAMES, [req.params.nameId], function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.createName = function(req, res) {
  con.query(queries.INSERT_NAME, [req.body.firstname, req.body.lastname], function(err, result) {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.json({ message: 'Number of records inserted: ' + result.affectedRows });
  });
};

exports.updateName = function(req, res) {
  con.query(
    queries.UPDATE_NAME, [req.body.firstname, req.body.lastname, req.params.nameId],
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

exports.deleteName = function(req, res) {
  con.query(queries.DELETE_NAME, [req.params.namesId], function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Deleted successfully.' });
  });
};