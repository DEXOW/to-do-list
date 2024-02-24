import dotenv from "dotenv";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import middleware from "./api/middleware/auth.js";

dotenv.config();
const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], 
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
import userRouter from "./api/routes/user.js";

// Use Routes
app.use("/api/v1/user", userRouter);

// app.use(express.static(path.join(__dirname, "./frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
// });

export default app;