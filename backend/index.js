import express from 'express';
import connectDB from './mongodb.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import cors from 'cors';

const app = express();
const port = 5500;

app.use(cors())

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

app.listen(port, () => {
  console.log(`iNotebook backend running at http://localhost:${port}`);
});
