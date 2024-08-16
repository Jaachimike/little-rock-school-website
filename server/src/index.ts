import express from "express";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes";
import sequelize from "./config/database";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/payments", paymentRoutes);
app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
