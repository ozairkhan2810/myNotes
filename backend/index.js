require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
connectDB();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening at port 5000`));
