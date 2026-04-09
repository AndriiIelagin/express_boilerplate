import app from './app.js';
import env from './config/env.js';
import initDatabase from './db/init.js';

const startServer = async () => {
  try {
    await initDatabase();

    app.listen(env.port, () => {
      console.log(`Server is running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();