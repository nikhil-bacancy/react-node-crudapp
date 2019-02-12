const collegesControllers = require('../controllers/user.controller');

const routes = (app) => {
  // app.get('/colleges/:limit?/:skip?/:sort?/:asc?/:name?', collegesControllers.list);
  app.get('/users/', collegesControllers.list);
  app.get('/users/:id', collegesControllers.list);
  app.post('/users', collegesControllers.create);
  app.put('/users/:id', collegesControllers.edit);
  app.put('/users/:id/deactive', collegesControllers.deActive);
  app.put('/users/:id/active', collegesControllers.active);
  app.delete('/users/:id', collegesControllers.delete);
};

module.exports = { routes };
