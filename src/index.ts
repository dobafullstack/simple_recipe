require("dotenv").config();
import app from "./configs/app";
import connectDB from "./configs/mongoose";

const main = async () => {
  const PORT = process.env.PORT || 4000;

  //Connect to MongoDB
  await connectDB();

  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
};

main().catch((err) => console.log(err));
