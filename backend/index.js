import express from 'express';

// Define routes
import { router as usersRouter } from './routes/api/users/users.js';
import { router as loginRouter } from './routes/api/users/login.js';
import { router as profileRouter } from './routes/api/users/profile.js';

const app = express();

// // static path
// app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.send('API running');
});

// Init middleware
app.use(express.json({ extended: false }));
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/profile', profileRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`running on port ${port}`);
});
