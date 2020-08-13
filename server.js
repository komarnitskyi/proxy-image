import express from 'express';
import routes from './routes';

const server = express();
server.disable('x-powered-by');

const port = process.env.PORT || 6677;

server.use(routes);

server.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});
