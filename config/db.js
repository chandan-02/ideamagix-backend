const mongoose = require("mongoose");

const chalk = require("chalk");

module.exports = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      `${process.env.MONGODB_CONNECTION_STRING}`, //connection string
      {
        useNewUrlParser: true,
      }
    );
    console.log(
      chalk.blueBright.underline(
        `Database Connected (${conn.connection.name}): ${conn.connection.host}`
      )
    );
    return conn.connection.db;
  } catch (err) {
    console.log(chalk.bold.redBright(`Error: ${err.message}`));
    console.log(chalk.bold.redBright(`Database not Connected`));
  }
};
