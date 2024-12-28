import express from 'express';
import connectDB from './mongodb.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

const app = express();
const port = 5500;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
