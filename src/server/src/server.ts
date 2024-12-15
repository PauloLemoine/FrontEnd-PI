import jsonServer from 'json-server';

import { employeeRouter } from './controllers/employeeController.ts';
import { loginRouter } from './controllers/loginController.ts';
import { schedulesRouter } from './controllers/scheduleController.ts';
import { servicesRouter } from './controllers/serviceController.ts';
import { usersRouter } from './controllers/userController.ts';

const server = jsonServer.create();

server.use(
  jsonServer.defaults({
    bodyParser: true,
    logger: true,
  })
);

server.use(usersRouter);
server.use(loginRouter);
server.use(servicesRouter);
server.use(employeeRouter);
server.use(schedulesRouter);

server.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
