import * as dotenv from 'dotenv';
// import dotenv from 'dotenv';
dotenv.config(); // THIS MUST BE FIRST!




import express from 'express';
import cors from 'cors';
import stabilityRoutes from './routes/stabilityRoutes.js';
import stabilityTextRoutes from './routes/stabilityTextRoutes.js';
import session from 'express-session';
import passport from 'passport';
import './passport.js'; // This must come AFTER dotenv.config()
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import authRoutes from './routes/authRoutes.js';

const port = process.env.PORT || 5000;
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/stability', stabilityRoutes);
app.use('/api/v1/stability-text', stabilityTextRoutes);
app.use('/auth', authRoutes); // <-- Add this line

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();