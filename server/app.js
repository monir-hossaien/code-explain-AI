import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit'
import router from "./src/routes/api.js"
import express from 'express';
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP address. Please try again later.",

})
// security middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use("/api", router);


//initial route
app.use("/", (req, res)=>{
    return res.status(200).send("Welcome to our code explain server")
})


export default app;

