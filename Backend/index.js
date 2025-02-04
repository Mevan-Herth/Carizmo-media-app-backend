const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan =require("morgan");
const userRoute = require("./dist/routes/users");
const authRoute = require("./dist/routes/auth");


const app = express();

dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, 
}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Database connection error:', err));


// Middlewear
app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const port = 8080;
app.listen(port, ()=>{
    console.log(`Backend server is runing on port ${port}`)
})