import express from 'express'
import config from './config'
import userRouter from './routes/user.route';

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use('/users', userRouter);
    
  app.listen(config.port, () => {
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    console.error(err);
    process.exit(1);
  });

}

startServer();