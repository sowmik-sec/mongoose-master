import { Server } from 'http';
import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

let server: Server;

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected. shutting down the server`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected. shutting down the server`);

  process.exit(1);
});
