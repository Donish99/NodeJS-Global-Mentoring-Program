import express from 'express';
import userRouter from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
