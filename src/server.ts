import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.mongodb_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on PORT ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log('😠 unhandled rejection detected, shutting down server...');

  if (server) {
    server.close(() => {
      process.exit();
    });
  }
  process.exit();
});

process.on('uncaughtException', () => {
  console.log(
    '😠 uncought  exception has been detected, shutting down server...',
  );

  process.exit(1);
});
