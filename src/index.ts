// @ts-check

import express from 'express';
const app: express.Application = express();

// routers

// error handlers

// logger

// cacheMiddleware

// middleware
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response): void => {
	res.status(200).send(
		'<h1>Image Processing API</h1><a href="/api/images">images route</a>'
	);
});


const port = 5000;

app.listen(port, (): void =>
	console.log(`Server is listening at http://localhost:${port}`)
);

export default app;
