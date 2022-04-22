import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

//define route to home page
app.use('/api', routes);

app.get('/', (_req, res) => {
  res.send('server is running');
});

app.listen(port, () => {
  console.log(`server started at  http://localhost:${3000}`);
});

export default app;
