import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

import User from "./models/User.js";
import { dataUser } from "./data/index.js";

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
// app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
// app.use("/management", managementRoutes);
// app.use("/sales", salesRoutes);

// Mongoes configuration
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      // User.insertMany(dataUser);
    });
  }) 
  .catch((err) => console.log(err));
