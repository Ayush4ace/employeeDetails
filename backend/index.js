
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employee.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/employee", employeeRoutes);

const port = process.env.port || 8000;
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
    connectDB();
})