/* eslint-disable no-console */
import app from './app';

const usedPort = 8080;

const startServer = (port: number) => {
  try {
    app.listen(port, () => {
      console.log(`[server]: Server is running at https://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

startServer(usedPort);
