import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGODB_URL;
  const databaseName = process.env.DATABASE_NAME;

  try {
    await mongoose.connect(`${uri}/${databaseName}`);

    console.log(`Connect to database ${databaseName} Successfully`);
  } catch (error) {
    console.log(error);
  }
}
