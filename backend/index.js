import express from 'express';
import path from 'path';
const app = express();
const __dirname = path.resolve(path.dirname(''));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Define routes
import { router as usersRouter } from './routes/api/users/users.js';
import { router as loginRouter } from './routes/api/users/login.js';
import { router as profileRouter } from './routes/api/users/profile.js';
import { router as createGroupRouter } from './routes/api/groups/new-group.js';
import { router as mygroupsRouter } from './routes/api/groups/my-groups.js';
import { router as groupsRouter } from './routes/api/groups/groups.js';

app.get('/', (req, res) => {
  res.send('API running');
});

// Init middleware
app.use(express.json({ extended: false }));
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/me', profileRouter);
app.use('/api/new-group', createGroupRouter);
app.use('/api/my-groups', mygroupsRouter);
app.use('/api/groups', groupsRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`running on port ${port}`);
});
