import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('API running');
});

//INit middleware
app.use(express.json({ extended: false }));

//Define routes
import { router as usersRouter } from './routes/api/users/users.js';
import { router as loginRouter } from './routes/api/users/login.js';
import { router as profileRouter } from './routes/api/users/profile.js';
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/profile', profileRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
