import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {

  try {

    const [rows] = await db.query('SELECT 1');

    res.json({

      message: 'Server Running',

      db: 'Connected'

    });

  } catch (error) {

    res.status(500).json({

      message: 'Database Connection Failed',

      error: error.message

    });

  }

});

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
