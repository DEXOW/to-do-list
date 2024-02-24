import mongoose from "mongoose";

const connection = () => {
  mongoose
    .connect(process.env.DB_URI, {
        dbName: process.env.DB_NAME,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err) => {
      console.log(`Error: ${err.message}`);
    });
};

export default connection;