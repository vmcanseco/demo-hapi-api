import Hapi, { ServerRoute } from '@hapi/hapi';
import { CatController } from './cats/cat.controller';
import pgPool from './database/dbpool';
import { CatService } from './cats/cat.service';

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  // Database connection
  const catService = new CatService(pgPool);
  const catController = new CatController(catService);
  const catRoutes: ServerRoute[] = [
    { method: 'POST', path: '/cats', handler: catController.createCat.bind(catController) },
    { method: 'GET', path: '/cats', handler: catController.getCats.bind(catController) },
    { method: 'GET', path: '/cats/{id}', handler: catController.getCatById.bind(catController) },
    { method: 'PUT', path: '/cats/{id}', handler: catController.updateCat.bind(catController) },
    { method: 'DELETE', path: '/cats/{id}', handler: catController.deleteCat.bind(catController) },
  ];

  server.route(catRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();