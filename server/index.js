import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import userrouter from "./routes/userRoutes.js";
import transactionrouter from "./routes/transactionRoutes.js";
import blockchainAdminRouter from "./routes/blockchainAdminRoutes.js";
import adminrouter from "./routes/adminRoute.js";



const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



app.use("/api/users", userrouter);
app.use("/api/transactions",transactionrouter);
app.use("/api/admincontrol",adminrouter);

app.use("/api/admin", blockchainAdminRouter); 

dotenv.config();
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;
// console.log(" DB link is here",process.env.MONGOURL)
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is runniing on Port:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
