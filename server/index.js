import dotenv from "dotenv";
dotenv.config();
import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server run success on port http://localhost:${port}`));