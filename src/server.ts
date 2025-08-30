import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.mongodb_url as string);



    if (mongoose.connection.readyState === 1) {
      console.log(mongoose.connection.readyState);
    } else {
      console.log('❌ MongoDB is not connected');
    }

    app.listen(config.port, () => {
      console.log(`Example app listening on PORT ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
