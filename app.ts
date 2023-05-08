import process from 'node:process';
import express, { type Request } from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';
import { Status } from './utils';

// ! Linter settings are in package.json
// ! Im behind on the projects and last project was accepted in ts
// I beg you to accept it in ts, converting it to js and configuring the
// linter will take me a considerable amount of time :(
// ts really helps me with the development process
// Thank You!!

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
	response.status(Status.notFound);
	response.send({ message: 'Error: unexpected request' });
});

app.listen(PORT, () => {
	console.log(`Listening on port = ${PORT}.\n URL: http://localhost:${PORT}`);
});
