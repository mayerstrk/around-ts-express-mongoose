import process from 'node:process';
import express, { type Request } from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';
import { Status } from './utils';

// ! Linter settings are in package.json

const { PORT = 1000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// eslint-disable-next-line @typescript-eslint/no-floating-promises
connect('mongodb://127.0.0.1:27017/aroundb');

app.use((request: Request, response, next) => {
	(request as Request & { user: { _id: string } }).user = {
		_id: '6457084afc70e0645e49b7aa',
	};
	next();
});

app.use('/', routes);

app.use((request, response) => {
	response.status(Status.internalServerError);
	response.send({ message: 'Error: unexpected request' });
});

app.listen(PORT, () => {
	console.log(`Listening on port = ${PORT}.\n URL: http://localhost:${PORT}`);
});
